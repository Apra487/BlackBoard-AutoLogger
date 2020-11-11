## BlackBoard auto login

A `nodejs` based application that automatically logs in into your account and attend your classes on `cuchd.blackboard.com` website.

_I wrote this script STRICTLY for EDUCATIONAL PURPOSES and I am NOT RESPONSIBLE for any **non-disciplinary** action commited by its users, i.e., all the students of Chandigarh University (yes, ALL, not just CSE or AIT !)_

## Motivation

I hate attending online classes. So I wrote this script to automate my presence.

## Tech/framework used

<>Built with</>

-   [Node.js](https://nodejs.org/en/)
-   [Puppeteer](https://pptr.dev/)

## Requirements

-   Git

## Installation

To use the program, we need to perform these steps once

-   Clone or download this repo.

```bash
git clone https://github.com/Apra487/BlackBoard-AutoLogger.git
cd BlackBoard-AutoLogger
```

-   Download and install [Node.js](https://nodejs.org/en/)
-   Create a `.env` file in the root of your project and insert your key/value pairs in the following format of `KEY=VALUE`:

```sh
UID=12bcs1234
PASSWORD=3454afdfj
```

-   Open terminal and change the current directory to the working directory
-   Install all the dependencies.

```bash
npm install
```

-   Run the following command on the terminal.

```bash
node run setup
```

-   It will ask for your weekly timetable, which you need to provide.Don't worry it is very interactive and you'll have no problem setting it up
<br>
Please provide the exact total number of subjects (including labs and (life skill and mentoring)).And also provide the exact time table including the time of lunch.

## How to use?

So you're done with the installation. But, how do you use it? 
<br>
-   Execute `index.js` by running the following command and voila ,you're in your class.

```bash
node index.js
```

<br>
NOTE :: This is still under development and I am sorry if you face any problems feel free to contact. Also, let me know if you have any suggestions for the program. You know where to find me. Adios !
