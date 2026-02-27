/* eslint-disable max-len */
// migrate_articles.js
// Usage: mongosh "mongodb://localhost:27017/YOUR_DB_NAME" migrate_articles.js
// Migrate ONE ISSUE AT A TIME — change the array below for each run.

// ============================================================
// EDIT THIS ARRAY — one object per article
// ============================================================
const ARTICLES_TO_MIGRATE = [
  {
    title:
      'MATERNAL HEALTH AND SOCIO-ECONOMIC CONDITIONS OF WOMEN IN SSA. FURTHER EVIDENCE FROM VAR GRANGER CAUSALITY',
    abstract:
      'Since the Safe Motherhood Initiative (SMI) was implemented in Nairobi, Kenya, everyone has agreed that good health for all pregnant mothers is a global goal. This has prompted several international conventions and programmes aimed at developing strategies to improve the health of pregnant women and their newborn babies.  The study looks at the relationship between socioeconomic factors and maternal health in Sub-Saharan Africa from 1995 to 2019. The panel unit root test (LCC) results indicate that the properties of the variables for the SSA countries are stable at levels. The results of the VAR causality test and the Granger causality test proposed by Granger show the presence of causality from any of the variables in the model, as well as the absence of causality. One of the policy implications of the findings is the need for a rethinking of a well-coordinated and consistent policy based on an understanding of the behavior of maternal health-driven policy variables, including inclusive health programs and interventions. Workable investment policies in primary and secondary healthcare, tailored to socioeconomic variables, would be beneficial.',
    keywords: [
      'Maternal Health',
      'Socioeconomic factors',
      'SSA',
      'VAR granger causality',
      'Women in SSA',
    ],
    authorEmail: 'presley.osemwengie@uniben.edu',
    coAuthorEmails: ['oluchi.okocha@uniben.edu'],
    volumeNumber: 9,
    issueNumber: 2,
    articleType: 'research_article',
    pages: { start: 24, end: 41 },
  },
  {
    title:
      'CRITIQUE OF “STRESS, HEALTH AND ILLNESS: FOUR CHALLENGES FOR THE FUTURE” AND “A STUDY OF CAUSES OF STRESS AND STRESS MANAGEMENT AMONG YOUTH”',
    abstract:
      'The critique paper examined two articles on stress─ stress, health and illness: four challenges for the future, and a study of causes of stress and stress management among youth in four regions in India. The critique probe into their efficacies/strengths and identify inherent weaknesses/limitations. Through a comprehensive review of the studies, the analysis exposes disparities in the effectiveness of current/contemporary issues in stress studies. The paper scrutinizes both the languages and writing style, appropriateness of methodology, clarity of purpose, significance, literature review for gaps and comprehensiveness, accurate and consistent citation practices and ethical considerations.  One notable strength in the article: stress, health and illness… is the paper’s comprehensive approach to the title and its objective. The paper addresses critical issue in our contemporary world as well as meeting the four challenges for the future. The writing style is appropriate coupled with the clarity of purpose. The citations were consistent. However, the paper lacks a longitudinal component, limiting the ability to establish causal relationships. Similarly, the paper by Bhargava and Trivedi succeeded in addressing the causes of stress and management of stress among young people but not without some inherent weaknesses/limitations. However, by identifying gaps and suggesting some recommendations, the critique contributes to the ongoing discourse on advancing comprehensive stress practices for individual and organization.',
    keywords: ['Critique', 'Stress', 'Health', 'Illness', 'Stress management'],
    authorEmail: 'osama.adagbonyin@uniben.edu',
    coAuthorEmails: ['presley.osemwengie@uniben.edu'],
    volumeNumber: 9,
    issueNumber: 2,
    articleType: 'research_article',
    pages: { start: 42, end: 51 },
  },
  {
    title: 'EMMERGING ISSUES IN ASSESSMENT AND TESTING: QUALITY DELIMA',
    abstract:
      'Performance in schools is increasingly judged on the basis of effective learning outcomes. The effectiveness of assessment and testing relies to a great extent on ensuring that both those who design and undertake its activities as well as those who use their results possess the quality skills and competencies to address the crucial issues necessary for assessment and testing. This study investigated emerging issues in assessment and testing. It x-rays the theoretical framework, assessment and testing with the aim of discussing the emerging issues in assessment and testing. The paper also identified and discussed the various reformed in assessment and testing. The paper further advance recommendations that there should be the need for workshops seminars and training forums to enable personnel who are involved in teaching and learning to understand more emerging issues and preferred reforms to address those issues.',
    keywords: [
      'Assessment',
      'Testing',
      'Emerging issues',
      'Reforms',
      'Quality',
    ],
    authorEmail: 'patriciaegba@gmail.com',
    coAuthorEmails: ['paulette.ekejiuba@uniben.edu'],
    volumeNumber: 9,
    issueNumber: 2,
    articleType: 'research_article',
    pages: { start: 52, end: 66 },
  },
  {
    title:
      'PERCEPTION OF THE IMPACT OF INFERTILITY ON MARITAL SATISFACTION BY RESIDENTS OF UGBOWO COMMUNITY, BENIN CITY, EDO STATE',
    abstract:
      'This study investigates the perception of infertility and marital satisfaction among married couples in Ugbowo community, Benin City, Edo state, Nigeria. The study adopted the dynamic goal theory as theoretical framework. It adopted mixed methods research designed for the data collection from married, divorced, widows and widowers’ residents in the study area. A total of 410 participants were selected using a multi stage sampling technique which comprised 400 participants who were administered the questionnaire and 10 other participants who were interviewed. The information obtained from the field were analyzed with the Statistical Package for Social Sciences (SPSS) (version 20) and the results were presented with descriptive statistics such as frequency tables and percentages. The in-depth interview was screened for consistency and thereafter transcribed and thematically analyzed the major themes with regards to the research objectives. The findings of the study established that infertility indeed influence marital satisfaction because many couples who are unable to procreate are hurt, sad, isolate themselves, and are in despair and these issues are mostly common among the women than the men and this has threatened several marriages in Ugbowo community, Edo State. The findings also show that infertility had a negative effect on the marital satisfaction among married couples in Ugbowo and the study recommends that there should be the need for good therapeutic counseling to couples facing the problems associated with infertility and childlessness.',
    keywords: [
      'Perception',
      'Infertility',
      'Married couples',
      'Marital satisfaction',
      'Ugbowo community',
    ],
    authorEmail: 'omorosec@gmail.com',
    coAuthorEmails: [],
    volumeNumber: 9,
    issueNumber: 2,
    articleType: 'research_article',
    pages: { start: 85, end: 106 },
  },
];
// ============================================================

print('=== Article Migration Script ===');
print(`Articles to process: ${ARTICLES_TO_MIGRATE.length}`);

let successCount = 0;
let skipCount = 0;
const errors = [];

for (let i = 0; i < ARTICLES_TO_MIGRATE.length; i++) {
  const articleData = ARTICLES_TO_MIGRATE[i];
  print(
    `\n[${i + 1}/${ARTICLES_TO_MIGRATE.length}] Processing: "${articleData.title.substring(0, 60)}..."`
  );

  try {
    // 1. Find primary author
    const author = db.Users.findOne({
      email: articleData.authorEmail.toLowerCase().trim(),
      role: 'author',
    });
    if (!author)
      throw new Error(`Author not found: ${articleData.authorEmail}`);

    // 2. Find co-authors
    const coAuthorIds = [];
    for (const coEmail of articleData.coAuthorEmails || []) {
      const coAuthor = db.Users.findOne({
        email: coEmail.toLowerCase().trim(),
      });
      if (!coAuthor) throw new Error(`Co-author not found: ${coEmail}`);
      coAuthorIds.push(coAuthor._id);
    }

    // 3. Find volume
    const volume = db.Volumes.findOne({
      volumeNumber: articleData.volumeNumber,
    });
    if (!volume)
      throw new Error(
        `Volume ${articleData.volumeNumber} not found. Create it first in the admin panel.`
      );

    // 4. Find issue — use its publishDate for the article
    const issue = db.Issues.findOne({
      volume: volume._id,
      issueNumber: articleData.issueNumber,
    });
    if (!issue)
      throw new Error(
        `Issue ${articleData.issueNumber} not found for Volume ${articleData.volumeNumber}. Create it first.`
      );

    // 5. Duplicate check
    const duplicate = db.Articles.findOne({
      title: articleData.title,
      issue: issue._id,
    });
    if (duplicate) {
      print(`  ⚠ SKIPPED — article already exists in this issue`);
      skipCount++;
      continue;
    }

    // 6. Build document
    const now = new Date();
    const article = {
      title: articleData.title.trim(),
      abstract: articleData.abstract.trim(),
      keywords: (articleData.keywords || []).map((k) => k.trim()),
      pdfFile: '', // empty — upload later via admin "Manual Articles" tab
      author: author._id,
      coAuthors: coAuthorIds,
      // NO manuscriptId — marks this as manually published
      publishDate: issue.publishDate, // use issue's publish date
      volume: volume._id,
      issue: issue._id,
      articleType: articleData.articleType || 'research_article',
      pages:
        articleData.pages?.start && articleData.pages?.end
          ? { start: articleData.pages.start, end: articleData.pages.end }
          : undefined,
      views: { count: 0, viewers: [] },
      downloads: { count: 0, downloaders: [] },
      citationCount: 0,
      license: 'CC BY 4.0',
      copyrightHolder: 'The Authors',
      isPublished: true,
      publishedAt: now,
      indexingStatus: {
        googleScholar: false,
        base: false,
        core: false,
        internetArchive: false,
      },
      publicationOptions: {
        doiEnabled: false,
        internetArchiveEnabled: false,
        emailNotificationEnabled: false,
      },
      emailNotificationStatus: {
        sent: false,
        idempotencyKey: `migration_${now.getTime()}_${i}`,
        recipientCount: 0,
        failureCount: 0,
      },
      createdAt: now,
      updatedAt: now,
    };

    db.Articles.insertOne(article);
    successCount++;
    print(
      `  ✓ Inserted — Author: ${author.name}, Vol ${articleData.volumeNumber} Iss ${articleData.issueNumber}, Pages ${articleData.pages?.start}-${articleData.pages?.end}`
    );
  } catch (err) {
    errors.push({
      title: articleData.title.substring(0, 50),
      error: err.message,
    });
    print(`  ✗ ERROR: ${err.message}`);
  }
}

print('\n======== SUMMARY ========');
print(`✓ Inserted : ${successCount}`);
print(`⚠ Skipped  : ${skipCount}`);
print(`✗ Errors   : ${errors.length}`);
if (errors.length > 0) {
  print('\nFailed articles:');
  errors.forEach((e, i) => print(`  ${i + 1}. "${e.title}..." — ${e.error}`));
}
print('=========================');
print(
  '\nNext step: Go to Admin → Publication → Manual Articles to upload PDFs.'
);
