import { commonStyles, commonFooter } from './styles';

export const reviewerCredentialsTemplate = (
  name: string,
  email: string,
  password: string,
  loginUrl: string
): string => `
<html>
<head>
    <style type="text/css">
        ${commonStyles}
    </style>
</head>
<body>
    <div class="header">
        <h1>Your UBJH Reviewer Account Credentials</h1>
    </div>
    
    <div class="content">
        <p>Dear ${name},</p>
        
        <p>Welcome to the University of Benin Journal of Humanities (UBJH)! Your reviewer account has been successfully created, and you can now access our online portal.</p>
        
        <div class="credentials">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Temporary Password:</strong> ${password}</p>
        </div>
        
        <p>For your security, we strongly recommend that you change this temporary password upon your first login. You can do this from your account settings.</p>
        
        <p>Please click the button below to log in to the UBJH portal:</p>
        
        <a href="${loginUrl}" class="button">Log In to Portal</a>
        
        <p>If you have any trouble logging in or did not expect this email, please contact our support team immediately.</p>
    </div>
    
    ${commonFooter}
</body>
</html>
`;
