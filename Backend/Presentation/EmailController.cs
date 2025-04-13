using System.Threading.Tasks;
using backend.Data;
using backend.Services.Interfaces;
using MailKit;
using Microsoft.AspNetCore.Mvc;



namespace backend.Presentation
{
    [Route("api/")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        public MailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send-mail")]
        public async Task<IActionResult> SendMail(EmailData emailData)
        {
            await _emailService.SendEmailAsync(emailData.EmailToId, emailData.EmailSubject, emailData.EmailBody);
            return Ok("Email sent successfully.");
        }
    } 
}