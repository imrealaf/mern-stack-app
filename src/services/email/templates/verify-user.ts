/**
 *  Verify user email template
 */
export default (data: any) => {
  return `
        <p>Hi ${data.name},</p>
        <p>Thanks for signing up with us! Click on <a href="${data.link}">this link</a> or the one below to activate your account:</p>
        <p><a href="${data.link}">${data.link}</a></p>
        <p>We just want to make sure it's you so we can keep in touch</p>
        <p>Cheers, <br /> ${data.fromName}</p>
    `;
};
