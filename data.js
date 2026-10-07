// title|year|genre|director|music|cast;cast|rating|budget(Cr)|gross(Cr)
// Ratings are approximate. Budget/box office (Rs crore) are rounded, widely reported figures, filled in only for major hits.
const RAW = `Pathala Bhairavi|1951|Fantasy|K.V. Reddy|Ghantasala|N.T. Rama Rao;S.V. Ranga Rao;Malathi|7.8||
Mayabazar|1957|Mythology|K.V. Reddy|Ghantasala|N.T. Rama Rao;A. Nageswara Rao;Savitri|8.6||
Missamma|1955|Comedy|L.V. Prasad|S. Rajeswara Rao|N.T. Rama Rao;A. Nageswara Rao;Savitri|8.0||
Devadasu|1953|Drama|Vedantam Raghavayya|C.R. Subbaraman|A. Nageswara Rao;Savitri|7.9||
Nartanasala|1963|Mythology|K. Kameswara Rao|Susarla Dakshinamurthy|N.T. Rama Rao;Savitri;S.V. Ranga Rao|8.0||
Sankarabharanam|1980|Musical|K. Viswanath|K.V. Mahadevan|J.V. Somayajulu;Manju Bhargavi|8.4||
Sagara Sangamam|1983|Musical|K. Viswanath|Ilaiyaraaja|Kamal Haasan;Jaya Prada|8.5||
Swathi Muthyam|1986|Drama|K. Viswanath|Ilaiyaraaja|Kamal Haasan;Radhika|8.4||
Siva|1989|Action|Ram Gopal Varma|Ilaiyaraaja|Nagarjuna;Amala|7.9||
Geetanjali|1989|Romance|Mani Ratnam|Ilaiyaraaja|Nagarjuna;Girija Shettar|8.0||
Aditya 369|1991|Sci-Fi|Singeetam Srinivasa Rao|Ilaiyaraaja|Nandamuri Balakrishna;Mohini|7.3||
Gang Leader|1991|Action|Vijaya Bapineedu|Bappi Lahiri|Chiranjeevi;Vijayashanti|7.2||
Kshana Kshanam|1991|Thriller|Ram Gopal Varma|M.M. Keeravani|Venkatesh;Sridevi|7.6||
Jagadeka Veerudu Athiloka Sundari|1990|Fantasy|K. Raghavendra Rao|Ilaiyaraaja|Chiranjeevi;Sridevi|7.9||
Gharana Mogudu|1992|Action|K. Raghavendra Rao|M.M. Keeravani|Chiranjeevi;Nagma;Vani Viswanath|7.2||
Gaayam|1993|Crime|Ram Gopal Varma|Sri|Jagapathi Babu;Revathi|7.7||
Annamayya|1997|Devotional|K. Raghavendra Rao|M.M. Keeravani|Nagarjuna;Ramya Krishna|7.9||
Ninne Pelladata|1996|Romance|Krishna Vamsi|Sandeep Chowta|Nagarjuna;Tabu|7.5||
Tholi Prema|1998|Romance|A. Karunakaran|Deva|Pawan Kalyan;Keerthi Reddy|8.0||
Samarasimha Reddy|1999|Action|B. Gopal|Mani Sharma|Nandamuri Balakrishna;Anjala Zaveri|7.2||
Nuvve Kavali|2000|Romance|K. Vijaya Bhaskar|Koti|Tarun;Richa Pallod|7.9||
Nuvvu Naaku Nachav|2001|Comedy|K. Vijaya Bhaskar|Koti|Venkatesh;Aarti Agarwal|8.0||
Kushi|2001|Romance|S.J. Suryah|Mani Sharma|Pawan Kalyan;Bhumika Chawla|7.9||
Student No. 1|2001|Drama|S.S. Rajamouli|M.M. Keeravani|N.T. Rama Rao Jr.;Gajala|7.2||
Murari|2001|Drama|Krishna Vamsi|Mani Sharma|Mahesh Babu;Sonali Bendre|7.2||
Narasimha Naidu|2001|Action|B. Gopal|Mani Sharma|Nandamuri Balakrishna;Simran|7.0||
Indra|2002|Action|B. Gopal|Mani Sharma|Chiranjeevi;Sonali Bendre;Aarti Agarwal|7.4||
Khadgam|2002|Drama|Krishna Vamsi|Devi Sri Prasad|Srikanth;Ravi Teja;Prakash Raj|8.0||
Manmadhudu|2002|Comedy|K. Vijaya Bhaskar|Devi Sri Prasad|Nagarjuna;Sonali Bendre|7.9||
Idiot|2002|Action|Puri Jagannadh|Chakri|Ravi Teja;Rakshita|7.1||
Santosham|2002|Romance|Dasaradh|R.P. Patnaik|Nagarjuna;Gracy Singh|6.9||
Okkadu|2003|Action|Gunasekhar|Mani Sharma|Mahesh Babu;Bhumika Chawla|7.6||
Simhadri|2003|Action|S.S. Rajamouli|M.M. Keeravani|N.T. Rama Rao Jr.;Bhumika Chawla;Ankita|7.3||
Tagore|2003|Action|V.V. Vinayak|Mani Sharma|Chiranjeevi;Shriya Saran|7.3||
Anand|2004|Romance|Sekhar Kammula|Mickey J Meyer|Raja;Kamalinee Mukherjee|7.8||
Arya|2004|Romance|Sukumar|Devi Sri Prasad|Allu Arjun;Anuradha Mehta;Siva Balaji|7.5||
Varsham|2004|Romance|Sobhan|Devi Sri Prasad|Prabhas;Trisha;Gopichand|7.2||
Malliswari|2004|Comedy|K. Vijaya Bhaskar|Koti|Venkatesh;Katrina Kaif|7.3||
Naa Autograph|2004|Drama|S. Gopal Reddy|M.M. Keeravani|Ravi Teja;Bhumika Chawla;Gopika|8.0||
Athadu|2005|Action|Trivikram Srinivas|Mani Sharma|Mahesh Babu;Trisha;Sonu Sood|8.0||
Chatrapathi|2005|Action|S.S. Rajamouli|M.M. Keeravani|Prabhas;Shriya Saran|7.4||
Nuvvostanante Nenoddantana|2005|Romance|Prabhu Deva|Devi Sri Prasad|Siddharth;Trisha|7.8||
Pokiri|2006|Action|Puri Jagannadh|Mani Sharma|Mahesh Babu;Ileana D'Cruz;Prakash Raj|7.8||
Bommarillu|2006|Romance|Bhaskar|Devi Sri Prasad|Siddharth;Genelia D'Souza;Prakash Raj|8.1||
Godavari|2006|Romance|Sekhar Kammula|K.M. Radha Krishnan|Sumanth;Kamalinee Mukherjee|7.8||
Vikramarkudu|2006|Action|S.S. Rajamouli|M.M. Keeravani|Ravi Teja;Anushka Shetty|7.6||
Happy Days|2007|Drama|Sekhar Kammula|Mickey J Meyer|Varun Sandesh;Tamannaah;Nikhil Siddhartha|7.8||
Yamadonga|2007|Fantasy|S.S. Rajamouli|M.M. Keeravani|N.T. Rama Rao Jr.;Priyamani;Mamta Mohandas|7.2||
Dhee|2007|Comedy|Srinu Vaitla|Chakri|Vishnu Manchu;Genelia D'Souza|7.4||
Gamyam|2008|Drama|Krish|E.S. Murthy|Sharwanand;Allari Naresh;Kamalinee Mukherjee|8.0||
Ready|2008|Comedy|Srinu Vaitla|Devi Sri Prasad|Ram Pothineni;Genelia D'Souza|6.8||
Magadheera|2009|Fantasy|S.S. Rajamouli|M.M. Keeravani|Ram Charan;Kajal Aggarwal;Dev Gill|7.7|40|150
Arya 2|2009|Romance|Sukumar|Devi Sri Prasad|Allu Arjun;Kajal Aggarwal;Navdeep|7.2||
Kick|2009|Comedy|Surender Reddy|Thaman S|Ravi Teja;Ileana D'Cruz|7.3||
Vedam|2010|Drama|Krish|M.M. Keeravani|Allu Arjun;Anushka Shetty;Manoj Manchu|8.2||
Maryada Ramanna|2010|Comedy|S.S. Rajamouli|M.M. Keeravani|Sunil;Saloni Aswani|7.6||
Ye Maaya Chesave|2010|Romance|Gautham Vasudev Menon|A.R. Rahman|Naga Chaitanya;Samantha|7.9||
Leader|2010|Drama|Sekhar Kammula|Mickey J Meyer|Rana Daggubati;Richa Gangopadhyay|7.8||
Simha|2010|Action|Boyapati Srinu|Chakri|Nandamuri Balakrishna;Nayanthara|7.0||
Dookudu|2011|Action|Srinu Vaitla|Thaman S|Mahesh Babu;Samantha|7.3||
Eega|2012|Fantasy|S.S. Rajamouli|M.M. Keeravani|Nani;Samantha;Sudeep|7.7|30|125
Gabbar Singh|2012|Action|Harish Shankar|Devi Sri Prasad|Pawan Kalyan;Shruti Haasan|7.5||
Julayi|2012|Action|Trivikram Srinivas|Devi Sri Prasad|Allu Arjun;Ileana D'Cruz;Rajendra Prasad|7.5||
Mirchi|2013|Action|Koratala Siva|Devi Sri Prasad|Prabhas;Anushka Shetty;Richa Gangopadhyay|7.4||
Seethamma Vakitlo Sirimalle Chettu|2013|Drama|Srikanth Addala|Mickey J Meyer|Venkatesh;Mahesh Babu;Samantha|7.4||
Race Gurram|2014|Action|Surender Reddy|Thaman S|Allu Arjun;Shruti Haasan;Prakash Raj|7.2||
Manam|2014|Comedy|Vikram K. Kumar|Anup Rubens|Nagarjuna;Naga Chaitanya;Samantha;A. Nageswara Rao|8.3||
Drushyam|2014|Thriller|Sripriya|Sharreth|Venkatesh;Meena|8.0||
Legend|2014|Action|Boyapati Srinu|Devi Sri Prasad|Nandamuri Balakrishna;Jagapathi Babu;Radhika Apte|7.0||
Baahubali: The Beginning|2015|Action|S.S. Rajamouli|M.M. Keeravani|Prabhas;Rana Daggubati;Anushka Shetty;Tamannaah|8.0|180|650
Srimanthudu|2015|Action|Koratala Siva|Devi Sri Prasad|Mahesh Babu;Shruti Haasan|7.4||
Bhale Bhale Magadivoy|2015|Comedy|Maruthi|Gopi Sundar|Nani;Lavanya Tripathi|7.4||
Kanche|2015|War|Krish|Chirantan Bhatt|Varun Tej;Pragya Jaiswal|7.7||
Temper|2015|Action|Puri Jagannadh|Anup Rubens|N.T. Rama Rao Jr.;Kajal Aggarwal;Prakash Raj|7.4||
Kshanam|2016|Thriller|Ravikanth Perepu|Sricharan Pakala|Adivi Sesh;Adah Sharma|8.0||
Pellichoopulu|2016|Comedy|Tharun Bhascker|Vivek Sagar|Vijay Deverakonda;Ritu Varma|8.2||
Oopiri|2016|Comedy|Vamshi Paidipally|Gopi Sundar|Nagarjuna;Karthi;Tamannaah|7.9||
Janatha Garage|2016|Drama|Koratala Siva|Devi Sri Prasad|N.T. Rama Rao Jr.;Mohanlal;Samantha|7.2||
Dhruva|2016|Thriller|Surender Reddy|Hiphop Tamizha|Ram Charan;Rakul Preet Singh;Arvind Swamy|7.8||
Arjun Reddy|2017|Romance|Sandeep Reddy Vanga|Radhan|Vijay Deverakonda;Shalini Pandey|8.0||
Baahubali 2: The Conclusion|2017|Action|S.S. Rajamouli|M.M. Keeravani|Prabhas;Rana Daggubati;Anushka Shetty;Tamannaah|8.2|250|1800
Fidaa|2017|Romance|Sekhar Kammula|Shakti Kanth Karthick|Varun Tej;Sai Pallavi|7.3||
Gautamiputra Satakarni|2017|Historical|Krish|Chirantan Bhatt|Nandamuri Balakrishna;Shriya Saran|7.3||
Khaidi No. 150|2017|Action|V.V. Vinayak|Devi Sri Prasad|Chiranjeevi;Kajal Aggarwal|6.2||
Rangasthalam|2018|Drama|Sukumar|Devi Sri Prasad|Ram Charan;Samantha;Jagapathi Babu|8.1||
Mahanati|2018|Biopic|Nag Ashwin|Mickey J Meyer|Keerthy Suresh;Dulquer Salmaan;Samantha|8.4||
Goodachari|2018|Spy|Sashi Kiran Tikka|Sricharan Pakala|Adivi Sesh;Sobhita Dhulipala|8.0||
Geetha Govindam|2018|Romance|Parasuram|Gopi Sundar|Vijay Deverakonda;Rashmika Mandanna|7.7||
Care of Kancharapalem|2018|Drama|Venkatesh Maha|Sweekar Agasthi|Subba Rao Vepada;Radha Bessy|8.6||
Aravinda Sametha Veera Raghava|2018|Action|Trivikram Srinivas|Thaman S|N.T. Rama Rao Jr.;Pooja Hegde;Jagapathi Babu|7.3||
Ee Nagaraniki Emaindi|2018|Comedy|Tharun Bhascker|Vivek Sagar|Vishwak Sen;Sushanth Reddy|7.8||
Bharat Ane Nenu|2018|Political|Koratala Siva|Devi Sri Prasad|Mahesh Babu;Kiara Advani|7.2||
Sammohanam|2018|Romance|Mohana Krishna Indraganti|Vivek Sagar|Sudheer Babu;Aditi Rao Hydari|7.3||
Jersey|2019|Sports|Gowtam Tinnanuri|Anirudh Ravichander|Nani;Shraddha Srinath|8.5||
Agent Sai Srinivasa Athreya|2019|Comedy|Swaroop RSJ|Mark K. Robin|Naveen Polishetty;Shruti Sharma|8.2||
Brochevarevarura|2019|Comedy|Vivek Athreya|Vivek Sagar|Sri Vishnu;Nivetha Thomas;Satyadev|8.2||
Mathu Vadalara|2019|Comedy|Ritesh Rana|Kaala Bhairava|Sri Simha;Satya|8.0||
Oh Baby|2019|Fantasy|B.V. Nandini Reddy|Mickey J Meyer|Samantha;Lakshmi;Naga Shaurya|7.6||
Maharshi|2019|Drama|Vamshi Paidipally|Devi Sri Prasad|Mahesh Babu;Pooja Hegde;Allari Naresh|6.8||
F2: Fun and Frustration|2019|Comedy|Anil Ravipudi|Devi Sri Prasad|Venkatesh;Varun Tej;Tamannaah|6.6||
Ala Vaikunthapurramuloo|2020|Drama|Trivikram Srinivas|Thaman S|Allu Arjun;Pooja Hegde;Tabu|7.3||
Colour Photo|2020|Romance|Sandeep Raj|Kaala Bhairava|Suhas;Chandini Chowdary|7.9||
Sarileru Neekevvaru|2020|Action|Anil Ravipudi|Devi Sri Prasad|Mahesh Babu;Rashmika Mandanna;Vijayashanti|6.2||
Pushpa: The Rise|2021|Action|Sukumar|Devi Sri Prasad|Allu Arjun;Rashmika Mandanna;Fahadh Faasil|7.6|250|370
Akhanda|2021|Action|Boyapati Srinu|Thaman S|Nandamuri Balakrishna;Pragya Jaiswal|7.2||
Love Story|2021|Romance|Sekhar Kammula|Pawan Ch|Naga Chaitanya;Sai Pallavi|7.4||
Jathi Ratnalu|2021|Comedy|Anudeep K.V.|Radhan|Naveen Polishetty;Priyadarshi;Faria Abdullah|7.5||
Uppena|2021|Romance|Buchi Babu Sana|Devi Sri Prasad|Panja Vaisshnav Tej;Krithi Shetty;Vijay Sethupathi|6.9||
Krack|2021|Action|Gopichand Malineni|Thaman S|Ravi Teja;Shruti Haasan|7.2||
Shyam Singha Roy|2021|Drama|Rahul Sankrityan|Mickey J Meyer|Nani;Sai Pallavi;Krithi Shetty|7.5||
RRR|2022|Action|S.S. Rajamouli|M.M. Keeravani|N.T. Rama Rao Jr.;Ram Charan;Alia Bhatt|7.8|550|1200
Sita Ramam|2022|Romance|Hanu Raghavapudi|Vishal Chandrashekhar|Dulquer Salmaan;Mrunal Thakur;Rashmika Mandanna|8.6||
Major|2022|Biopic|Sashi Kiran Tikka|Sricharan Pakala|Adivi Sesh;Sobhita Dhulipala;Saiee Manjrekar|8.1||
Karthikeya 2|2022|Mystery|Chandoo Mondeti|Kaala Bhairava|Nikhil Siddhartha;Anupama Parameswaran|7.5||
Sarkaru Vaari Paata|2022|Action|Parasuram|Thaman S|Mahesh Babu;Keerthy Suresh|5.8||
Ante Sundaraniki|2022|Comedy|Vivek Athreya|Vivek Sagar|Nani;Nazriya Nazim|7.0||
Waltair Veerayya|2023|Action|K.S. Ravindra|Devi Sri Prasad|Chiranjeevi;Ravi Teja;Shruti Haasan|6.5||
Veera Simha Reddy|2023|Action|Gopichand Malineni|Thaman S|Nandamuri Balakrishna;Shruti Haasan|6.2||
Bhagavanth Kesari|2023|Action|Anil Ravipudi|Thaman S|Nandamuri Balakrishna;Kajal Aggarwal;Sreeleela|7.0||
Salaar: Part 1 - Ceasefire|2023|Action|Prashanth Neel|Ravi Basrur|Prabhas;Prithviraj Sukumaran;Shruti Haasan|6.5|270|700
Hanu-Man|2024|Superhero|Prasanth Varma|Gowra Hari & Anudeep Dev|Teja Sajja;Amritha Aiyer;Varalaxmi Sarathkumar|7.8||
Kalki 2898 AD|2024|Sci-Fi|Nag Ashwin|Santhosh Narayanan|Prabhas;Amitabh Bachchan;Kamal Haasan;Deepika Padukone|7.0|600|1100
Lucky Baskhar|2024|Crime|Venky Atluri|G.V. Prakash Kumar|Dulquer Salmaan;Meenakshi Chaudhary|8.3||
Pushpa 2: The Rule|2024|Action|Sukumar|Devi Sri Prasad|Allu Arjun;Rashmika Mandanna;Fahadh Faasil|6.5|500|1700
Devara: Part 1|2024|Action|Koratala Siva|Anirudh Ravichander|N.T. Rama Rao Jr.;Janhvi Kapoor;Saif Ali Khan|5.8||`;

export const movies = RAW.split("\n").map((line, i) => {
  const [title, year, genre, director, music, cast, rating, budget, gross] = line.split("|");
  return {
    id: i + 1, title, year: +year, genre, director, music, rating: +rating,
    budget: budget ? +budget : null, gross: gross ? +gross : null,
    cast: cast.split(";"), hue: (i * 37) % 360,
  };
});
