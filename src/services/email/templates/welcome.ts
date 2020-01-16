/**
 *  Welcome email template
 */
export default (data: any) => {
  return `
        <p>Hi ${data.name},</p>
        <p>Thanks for signing up with us! Click on <a href="${data.link}">this link</a> or the one below if you ever forget how to login your account:</p>
        <p><a href="${data.link}">${data.link}</a></p>
        <p>Cheers, <br /> ${data.fromName}</p>
    `;
};
