/**
 *  Make admin email template
 */
export default (data: any) => {
  return `
        <p>Hi ${data.name},</p>
        <p>Your account has been upgraded to have admin privilages. Use these powers wisely!</p>
        <p>Cheers, <br /> ${data.fromName}</p>
    `;
};
