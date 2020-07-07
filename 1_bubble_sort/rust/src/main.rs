fn main() {
    let data = read_data();
    let ints: Vec<u16> = string_to_u16_vec(data);

    println!("{}", ints.len());
}

fn read_data() -> String {
    std::fs::read_to_string("../data").unwrap()
}

fn string_to_u16_vec(data: String) -> Vec<u16> {
    data.split('\n')
        .map(|x| x.parse::<u16>().unwrap())
        .collect()
}

fn bubble_sort(numbers: Vec<u16>) -> Vec<u16> {
    // return sorted Vec of u16
}
