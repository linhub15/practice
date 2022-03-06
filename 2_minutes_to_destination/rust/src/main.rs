use std::io::{self, Read};

fn main() {

    let km_per_hour = 120.0;
    let distance = 300.0;
    let hours_remaining = km_per_hour / distance;
    let minutes = hours_remaining * 60.0;
    println!("{}", minutes);

    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("failed to read from stdin");

    let trimmed = input.trim();
    let float = match trimmed.parse::<f64>() {
        Ok(i) => println!("float parsed: {}", i),
        Err(..) => println!("this is not a float: {}", trimmed),
    };
}
