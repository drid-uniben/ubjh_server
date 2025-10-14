import { Request, Response } from 'express';
import Manuscript from '../Manuscript_Submission/models/manuscript.model';
import { NotFoundError, UnauthorizedError } from '../utils/customErrors';
import asyncHandler from '../utils/asyncHandler';
import logger from '../utils/logger';
import User from '../model/user.model';
import { PipelineStage } from 'mongoose';

interface IManuscriptQuery {
  status?: string;
  isArchived?: boolean;
}

interface IPaginationOptions {
  page: number;
  limit: number;
  sort: Record<string, 1 | -1>;
}

interface IManuscriptResponse {
  success: boolean;
  count?: number;
  totalPages?: number;
  currentPage?: number;
  message?: string;
  data?: any;
}

interface IStatisticsResponse {
  success: boolean;
  data: {
    total: number;
    byStatus: Record<string, number>;
  };
}

interface AdminAuthenticatedRequest extends Request {
  user: {
    id: string;
    role: string;
  };
}

class AdminController {
  // Get all manuscripts with pagination and filtering
  getAllManuscripts = asyncHandler(
    async (req: Request, res: Response<IManuscriptResponse>): Promise<void> => {
      const user = (req as AdminAuthenticatedRequest).user;
      // Check if user is admin
      if (user.role !== 'admin') {
        throw new UnauthorizedError(
          'You do not have permission to access this resource'
        );
      }

      const {
        page = 1,
        limit = 10,
        status,
        faculty,
        sort = 'createdAt',
        order = 'desc',
        isArchived,
      } = req.query;

      const query: IManuscriptQuery = {};

      // Apply filters if provided
      if (status) query.status = status as string;
      // Apply isArchived filter
      if (isArchived !== undefined) {
        query.isArchived = isArchived === 'true';
      } else {
        query.isArchived = false;
      }

      // Handle duplicates sorting - when sort is 'duplicates'
      if (sort === 'duplicates') {
        // Find submitters who have more than one manuscript
        const duplicateSubmitters = await Manuscript.aggregate([
          { $match: query }, // Apply existing filters first
          { $group: { _id: '$submitter', count: { $sum: 1 } } },
          { $match: { count: { $gt: 1 } } },
          { $project: { submitter: '$_id' } },
        ]);

        const duplicateSubmitterIds = duplicateSubmitters.map(
          (item) => item.submitter
        );

        if (duplicateSubmitterIds.length === 0) {
          // No duplicates found, return empty result
          logger.info(
            `Admin ${user.id} retrieved manuscripts list - no duplicates found`
          );
          res.status(200).json({
            success: true,
            count: 0,
            totalPages: 0,
            currentPage: parseInt(page as string, 10),
            data: [],
          });
          return;
        }

        // Build aggregation pipeline for grouped results by submitter
        const pipeline = [
          {
            $match: {
              ...query,
              submitter: { $in: duplicateSubmitterIds },
            },
          },
          {
            $lookup: {
              from: 'Users',
              localField: 'submitter',
              foreignField: '_id',
              as: 'submitterData',
            },
          },
          {
            $unwind: '$submitterData',
          },
          {
            $sort: {
              'submitterData.name': order === 'asc' ? 1 : -1,
              createdAt: -1,
            },
          },
          {
            $skip:
              (parseInt(page as string, 10) - 1) *
              parseInt(limit as string, 10),
          },
          {
            $limit: parseInt(limit as string, 10),
          },
          {
            $project: {
              _id: 1,
              title: 1,
              status: 1,
              createdAt: 1,
              isArchived: 1,
              submitter: {
                _id: '$submitterData._id',
                name: '$submitterData.name',
                email: '$submitterData.email',
              },
            },
          },
        ];

        const manuscripts = await Manuscript.aggregate(
          pipeline as PipelineStage[]
        );

        const totalManuscripts = await Manuscript.countDocuments({
          ...query,
          submitter: { $in: duplicateSubmitterIds },
        });

        logger.info(
          `Admin ${user.id} retrieved manuscripts list sorted by duplicates`
        );

        res.status(200).json({
          success: true,
          count: manuscripts.length,
          totalPages: Math.ceil(
            totalManuscripts / parseInt(limit as string, 10)
          ),
          currentPage: parseInt(page as string, 10),
          data: manuscripts,
        });
        return;
      }

      const sortObj: Record<string, 1 | -1> = {};
      sortObj[sort as string] = order === 'asc' ? 1 : -1;

      const options: IPaginationOptions = {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        sort: sortObj,
      };

      let manuscripts;

      if (faculty) {
        const usersWithFaculty = await User.find({
          faculty: faculty as string,
        }).select('_id');
        const userIds = usersWithFaculty.map((user) => user._id);

        manuscripts = await Manuscript.find({
          ...query,
          submitter: { $in: userIds },
        })
          .sort(sortObj)
          .skip((options.page - 1) * options.limit)
          .limit(options.limit)
          .populate('submitter', 'name email');

        const totalManuscripts = await Manuscript.countDocuments({
          ...query,
          submitter: { $in: userIds },
        });

        logger.info(
          `Admin ${user.id} retrieved manuscripts list filtered by faculty`
        );

        res.status(200).json({
          success: true,
          count: manuscripts.length,
          totalPages: Math.ceil(totalManuscripts / options.limit),
          currentPage: options.page,
          data: manuscripts,
        });
      } else {
        manuscripts = await Manuscript.find(query)
          .sort(sortObj)
          .skip((options.page - 1) * options.limit)
          .limit(options.limit)
          .populate('submitter', 'name email');

        const totalManuscripts = await Manuscript.countDocuments(query);

        logger.info(`Admin ${user.id} retrieved manuscripts list`);

        res.status(200).json({
          success: true,
          count: manuscripts.length,
          totalPages: Math.ceil(totalManuscripts / options.limit),
          currentPage: options.page,
          data: manuscripts,
        });
      }
    }
  );

  // Get manuscript by ID
  getManuscriptById = asyncHandler(
    async (req: Request, res: Response<IManuscriptResponse>): Promise<void> => {
      const user = (req as AdminAuthenticatedRequest).user;
      if (user.role !== 'admin') {
        throw new UnauthorizedError(
          'You do not have permission to access this resource'
        );
      }

      const { id } = req.params;

      const manuscript = await Manuscript.findById(id).populate(
        'submitter coAuthors',
        'name email faculty institution'
      );

      if (!manuscript) {
        throw new NotFoundError('Manuscript not found');
      }

      logger.info(`Admin ${user.id} retrieved manuscript ${id}`);

      res.status(200).json({
        success: true,
        data: manuscript,
      });
    }
  );

  // Get manuscript statistics
  getManuscriptStatistics = asyncHandler(
    async (req: Request, res: Response<IStatisticsResponse>): Promise<void> => {
      const user = (req as AdminAuthenticatedRequest).user;
      if (user.role !== 'admin') {
        throw new UnauthorizedError(
          'You do not have permission to access this resource'
        );
      }

      const totalManuscripts = await Manuscript.countDocuments();

      const statusCounts = await Manuscript.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]);

      const statusStats: Record<string, number> = {};
      statusCounts.forEach((item) => {
        statusStats[item._id] = item.count;
      });

      logger.info(`Admin ${user.id} retrieved manuscript statistics`);

      res.status(200).json({
        success: true,
        data: {
          total: totalManuscripts,
          byStatus: statusStats,
        },
      });
    }
  );
}

export default new AdminController();
