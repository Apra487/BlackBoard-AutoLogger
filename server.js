const program = require('commander');
const path = require('path');
let fs = require('fs');
let fspromise = fs.promises;
const inquirer = require('inquirer');
const readline = require('readline');

let totalSubject = [];

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let i = 0;
let prompt = async ({ message, name }, answer) => {
	i++;
	if (i <= answer) {
		return inquirer
			.prompt({ message, name })
			.then(function ({ name: entry }) {
				totalSubject.push(entry.toLocaleLowerCase());
				return prompt({ message: `Subject ${i + 1} `, name }, answer);
			});
	}
};

let schedule = {};
const daysInWeek = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

let j = 0;
let prompt1 = async (day, index) => {
	j++;
	if (j <= 7) {
		return inquirer
			.prompt([
				{
					type: 'list',
					name: 'selected',
					message: `${day} class ${j}`,
					choices: JSON.parse(fs.readFileSync('./sub.json')),
				},
			])
			.then(({ selected }) => {
				if (selected === 'break') {
					console.log(schedule[index]);
					schedule[day].push(-1);
				} else {
					console.log();
					schedule[day].push(totalSubject.indexOf(selected));
				}
				return prompt1(day);
			})
			.catch((e) => console.log(e));
	}
};

program.version('0.0.1').description('BB CLI program');

program
	.command('setup')
	.alias('n')
	.description('add timetable')
	.action(() => {
		rl.question(
			'Enter total number of subjects including labs and lifeskill and mentoring ',
			(answer) => {
				prompt({ message: `Subject 1 `, name: 'name' }, answer).then(
					async () => {
						try {
							totalSubject = totalSubject.sort();
							totalSubject.push('break');
							await fspromise.writeFile(
								path.resolve('./sub.json'),
								JSON.stringify(totalSubject)
							);
							async function finalPrompt(index) {
								index++;
								schedule[daysInWeek[index]] = [];
								if (index < 7) {
									return await prompt1(
										daysInWeek[index],
										index
									).then(() => {
										j = 0;
										console.log('yo');
										console.log(index);
										fs.writeFileSync(
											path.resolve('./schedule.json'),
											JSON.stringify(schedule, null, 2)
										);
										finalPrompt(index);
									});
								}
							}
							await finalPrompt(0);
						} catch (error) {
							console.log('Crap happens');
						}
					}
				);
			}
		);
	});

program.parse(process.argv);
