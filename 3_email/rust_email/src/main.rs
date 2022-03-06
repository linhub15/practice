use dotenv;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};

fn main() {
    dotenv::dotenv().ok();

    let username = match dotenv::var("GMAIL_USERNAME") {
        Ok(value) => value,
        Err(_e) => "none".to_string(),
    };
    let password = match dotenv::var("GMAIL_PASSWORD") {
        Ok(value) => value,
        Err(_e) => "none".to_string(),
    };

    let from = dotenv::var("FROM").unwrap();
    let to = dotenv::var("TO").unwrap();

    let email = Message::builder()
        .from(from.parse().unwrap())
        .to(to.parse().unwrap())
        .subject("I'm sending you emails from my rust program")
        .body(String::from("test message"))
        .unwrap();

    let creds = Credentials::new(username.to_string(), password.to_string());

    // Open a remote connection to gmail
    let mailer = SmtpTransport::relay("smtp.gmail.com")
        .unwrap()
        .credentials(creds)
        .build();

    // Send the email
    match mailer.send(&email) {
        Ok(_) => println!("Email sent successfully!"),
        Err(e) => panic!("Could not send email: {:?}", e),
    }
}
