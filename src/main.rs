use std::env;
use std::path::Path;
use std::io::{BufRead, BufReader};
use std::fs::File;

fn main() {
    let path = read_args();
    let numbers = read_numbers(&path).unwrap();
    largest_num(numbers);
}

fn read_args() -> String {
    let args: Vec<String> = env::args().collect();
    if args.len() > 1 {
        return args[1].clone()
    }
    println!("Specify a file path");
    std::process::exit(1);
}

fn read_numbers(path: &String) -> Result<Vec<i32>, &'static str> {
    let path = Path::new(path);
    let file = File::open(path).unwrap();
    let file_reader = BufReader::new(file);
    let mut vector: Vec<i32> = vec![];

    for line in file_reader.lines() {
        match line {
            Err(reason) => panic!("{:?}", reason),
            Ok(string)  => match string.trim().parse::<i32>() {
                Err(reason) => panic!(reason),
                Ok(number) => vector.push(number)
            }
        }
    }
    Ok(vector)
}

fn largest_num(numbers: Vec<i32>) {
    let mut largest = 0;
    for i in numbers.iter() {
        if &largest < i {
            largest = *i;
        } 
    }
    println!("{}", largest);
}
