import {
  submissionConfirmationStyles,
  submissionConfirmationFooter,
} from './styles';

export const submissionConfirmationTemplate = (
  name: string,
  title: string,
  isRevision = false
): string => {
  const subject = isRevision
    ? 'Manuscript Revision Confirmation'
    : 'Manuscript Submission Confirmation';
  const body = isRevision
    ? `<p>Thank you for submitting your revised manuscript titled <strong class="highlight">"${title}"</strong>.</p><p>Your revision has been received and is now under review.</p>`
    : `<p>Thank you for submitting your manuscript titled <strong class="highlight">"${title}"</strong>.</p><p>Your submission has been received and is now under review by our committee.</p>`;

  return `
<html>
<head>
    <style type="text/css">
        ${submissionConfirmationStyles}
    </style>
</head>
<body>
    <div class="header">
        <h1>${subject}</h1>
    </div>
    
    <div class="content">
        <p>Dear ${name},</p>
        
        ${body}
        
        <p>We appreciate your contribution to the research community at the University of Benin. You will receive further communication regarding the status of your submission as soon as possible</p>
    </div>
    
    ${submissionConfirmationFooter}
</body>
</html>
`;
};
