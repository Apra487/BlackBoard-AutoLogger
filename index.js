const puppeteer = require('puppeteer');
const getTime = require('date-fns/getTime');
const fs = require('fs');

require('dotenv').config();

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

let routine = JSON.parse(fs.readFileSync('./schedule.json'));

let i;

(async function () {
	while (true) {
		let month = new Date().getMonth();
		let date = new Date().getDate();
		let year = new Date().getFullYear();

		let result, delay, end, close;

		let day = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		][new Date().getDay()];
		
		if (new Date().getDay() === 0) {
			console.log('Holiday!');
			return 10;
		}

		let hour = new Date().getHours();

		switch (hour) {
			case 9:
				if (new Date().getMinutes() > 45) {
					i = routine[day][0];
					end = getTime(new Date(year, month, date, 10, 45, 0, 000));
					close = end - Date.now();
				} else {
					console.log(
						'You are early Today. But no worries I will take care of it'
					);
					console.log('Waiting for the scheduled time ....');
					result = getTime(
						new Date(year, month, date, 9, 46, 0, 000)
					);
					delay = result - Date.now();
					sleep(delay);
					i = routine[day][0];
					end = getTime(new Date(year, month, date, 10, 45, 0, 000));
					close = end - Date.now();
				}
				break;
			case 10:
				if (new Date().getMinutes() < 45) {
					i = routine[day][0];
					end = getTime(new Date(year, month, date, 10, 45, 0, 000));
					close = end - Date.now();
				} else {
					if (routine[day][1] == -1) {
						console.log('Break is going on!! I am going to sleep');
						result = getTime(
							new Date(year, month, date, 12, 35, 0, 000)
						);
						delay = result - Date.now();
						sleep(delay);
						i = routine[day][3];
						end = getTime(
							new Date(year, month, date, 13, 30, 0, 000)
						);
						close = end - Date.now();
					} else {
						i = routine[day][1];
						end = getTime(
							new Date(year, month, date, 11, 45, 0, 000)
						);
						close = end - Date.now();
					}
				}
				break;
			case 11:
				if (new Date().getMinutes() < 45) {
					i = routine[day][1];
					end = getTime(new Date(year, month, date, 11, 45, 0, 000));
					close = end - Date.now();
				} else {
					if (routine[day][2] == -1) {
						console.log('Break is going on!! I am going to sleep');
						result = getTime(
							new Date(year, month, date, 12, 35, 0, 000)
						);
						delay = result - Date.now();
						sleep(delay);
						i = routine[day][3];
						end = getTime(
							new Date(year, month, date, 13, 30, 0, 000)
						);
						close = end - Date.now();
					} else {
						i = routine[day][2];
						end = getTime(
							new Date(year, month, date, 12, 45, 0, 000)
						);
						close = end - Date.now();
					}
				}
				break;
			case 12:
				if (new Date().getMinutes() < 45) {
					if (routine[day][2] == -1) {
						console.log('Break is going on!! I am going to sleep');
						result = getTime(
							new Date(year, month, date, 12, 35, 0, 000)
						);
						delay = result - Date.now();
						sleep(delay);
						i = routine[day][3];
						end = getTime(
							new Date(year, month, date, 13, 30, 0, 000)
						);
						close = end - Date.now();
					} else {
						i = routine[day][2];
						end = getTime(
							new Date(year, month, date, 12, 45, 0, 000)
						);
						close = end - Date.now();
					}
				} else {
					if (routine[day][3] == -1) {
						console.log('Break is going on!! I am going to sleep');
						result = getTime(
							new Date(year, month, date, 13, 35, 0, 000)
						);
						delay = result - Date.now();
						sleep(delay);
						i = routine[day][4];
						end = getTime(
							new Date(year, month, date, 14, 30, 0, 000)
						);
						close = end - Date.now();
					} else {
						i = routine[day][3];
						end = getTime(
							new Date(year, month, date, 13, 30, 0, 000)
						);
						close = end - Date.now();
					}
				}
				break;
			case 13:
				if (new Date().getMinutes() < 30) {
					if (routine[day][3] == -1) {
						console.log('Break is going on!! I am going to sleep');
						result = getTime(
							new Date(year, month, date, 13, 35, 0, 000)
						);
						delay = result - Date.now();
						sleep(delay);
						i = routine[day][4];
						end = getTime(
							new Date(year, month, date, 14, 30, 0, 000)
						);
						close = end - Date.now();
					} else {
						i = routine[day][3];
						end = getTime(
							new Date(year, month, date, 13, 30, 0, 000)
						);
						close = end - Date.now();
					}
				} else {
					i = routine[day][4];
					end = getTime(new Date(year, month, date, 14, 30, 0, 000));
					close = end - Date.now();
				}
				break;
			case 14:
				if (new Date().getMinutes() < 30) {
					i = routine[day][4];
					end = getTime(new Date(year, month, date, 14, 30, 0, 000));
					close = end - Date.now();
				} else {
					if (routine[day][5] == -1) {
						console.log('Class is over!!');
						return 2;
					}
					i = routine[day][5];
					end = getTime(new Date(year, month, date, 15, 30, 0, 000));
					close = end - Date.now();
				}
				break;
			case 15:
				if (new Date().getMinutes() < 30) {
					i = routine[day][5];
					end = getTime(new Date(year, month, date, 15, 30, 0, 000));
					close = end - Date.now();
				} else {
					console.log('Class is over!!');
					return 2;
				}
				break;
			default:
				if (hour < 9 && hour > 7) {
					console.log(
						'You are too early today. Please come back after 9 am'
					);
				} else {
					console.log('No schedule!');
				}
				return 3;
		}

		const browser = await puppeteer
			.launch({
				defaultViewport: null,
				headless: false,
				args: [
					'--use-fake-ui-for-media-stream',
					'--use-file-for-fake-video-capture',
				],
			})
			.catch((e) => 'yo!!');

		const page = await browser.newPage().catch((e) => 'What!!');
		await page.setDefaultNavigationTimeout(0);
		await page
			.goto('https://cuchd.blackboard.com/ultra/', {
				waitUntil: 'networkidle0',
			})
			.catch((e) => 'What!!');
		await page
			.waitForSelector('.button-1', { timeout: 40000 })
			.catch(async (e) => {
				while (true) {
					console.log(1);
					await page.waitFor(3000);
					console.log(2);
					await page.reload().catch((e) => console.log('Weeds!!'));
					await page
						.waitForSelector('.button-1')
						.catch((e) => console.log('Error!!'));
					console.log(3);
					let b = await page.$('.button-1');
					if (b) break;
				}
			});
		await page.click('.button-1');
		await page.type('#user_id', process.env.UID);
		await page.type('#password', process.env.PASSWORD);
		await page.click('#entry-login');
		await page.waitForNavigation({ timeout: 500000 });
		await page
			.waitForSelector('.course-id', { timeout: 60000 })
			.catch(async (e) => {
				let i = 0;
				while (true) {
					i++;
					console.log('BB chud gaya!!');
					await page.waitFor(2000);
					await page.reload();
					await page.waitFor(3000);
					await page
						.waitForSelector('.course-id')
						.catch((e) => console.log('Nope!!'));
					let b = await page.$('.course-id');
					if (b) break;
				}
				close -= i * 5000;
			});
		let demo = await page.$$('h4');
		await demo[i].click().catch(async (e) => {
			await page.evaluate(
				'window.scrollTo(0, document.body.scrollHeight)'
			);
			demo = await page.$$('h4');
			console.log('scroll');
			await page.waitFor(10000);
			close = close - 10000;
			await demo[i].click().catch((e) => console.log('Bitch'));
			console.log(demo);
		});
		await page.waitFor(10000);
		close = close - 10000;
		await page.waitForSelector('span.blue-link');

		await page.waitFor(10000);
		close = close - 10000;
		let join = await page
			.$$('button#sessions-list-dropdown')
			.catch((e) => console.log('BC'));
		await join[0].click().catch((e) => console.log('BC'));
		let final = await page
			.$x(
				'/html/body/div[1]/div[2]/bb-base-layout/div/main/div[3]/div/div[3]/div/div/div/div[2]/div/div[2]/div[3]/div/div[2]/div[3]/aside/div[6]/div[2]/div[2]/div/div/ul/li[2]/a'
			)
			.catch((e) => console.log('MC'));

		let pageTarget = await page.target();
		if (final[0]) {
			await final[0].click().catch((e) => {
				console.log('BB ERROR!!');
			});
		} else {
			(async function () {
				console.log(
					'Session has not started yet!! \nTeacher is lazy!!!'
				);
				let i = 0,
					j = 0;
				let start = Date.now();
				while (true) {
					if (Date.now() - start >= close) {
						close = 0;
						return;
					}
					await page.waitFor(5000);
					await page
						.reload({ waitUntil: 'networkidle0' })
						.catch((e) => true);
					await page
						.waitForSelector('button#sessions-list-dropdown', {
							timeout: 40000,
						})
						.catch((e) => {
							j++;
							console.log('Not available');
						});
					join = await page
						.$$('button#sessions-list-dropdown')
						.catch((e) => console.log('BB error!!'));
					console.log(join.length);
					if (join[0]) {
						await page.waitFor(10000);
						i++;
						await join[0].click().catch((e) => console.log('BC'));
						final = await page.$x(
							'/html/body/div[1]/div[2]/bb-base-layout/div/main/div[3]/div/div[3]/div/div/div/div[2]/div/div[2]/div[3]/div/div[2]/div[3]/aside/div[6]/div[2]/div[2]/div/div/ul/li[2]/a'
						);
						if (final[0]) {
							close = close - (i * 12000 + j * 40000);
							break;
						}
					}
				}
				await final[0].click();
			})();
		}

		const newTarget = await browser
			.waitForTarget((target) => target.opener() === pageTarget, {
				timeout: 900000,
			})
			.catch((e) => {
				close = 0;
				console.log('Something went seriously wrong!');
				return;
			});
		await page.setDefaultNavigationTimeout(0);
		const newPage = await newTarget.page({ timeout: 900000 });
		let appUrl = newPage._target._targetInfo.url;
		await newPage
			.goto(appUrl, { waitUntil: 'networkidle0' })
			.catch((e) => console.log('error'));
		await newPage.waitFor(30000);

		let seconds = 0;
		async function second() {
			seconds++;
			await newPage.waitFor(30000);
			console.log('second!!');
			close = close - seconds * 30000;
			let t = 0;
			await newPage
				.waitForSelector('#techcheck-modal', { timeout: 50000 })
				.catch(async (e) => {
					t++;
					close = close - t * 30000;
					await newPage.reload().catch((e) => console.log('Phew!!'));
					second();
				});
		}

		second().catch(async (e) => {
			await newPage.waitFor(30000);
			close = close - 30000;
			await newPage.reload();
			second();
		});

		async function third() {
			var end1 = await newPage.$(
				'.reveal-overlay > #techcheck-modal > button.close'
			);
			if (end1) {
				await end1.click().catch(async (e) => {
					await newPage.waitFor(30000);
					await newPage.reload();
					console.log('third0!!');
					second();
					third();
				});
			} else {
				await newPage.reload();
				await newPage.waitFor(30000);
				close = close - 30000;
				console.log('third!!');
				second();
				third();
			}
		}
		third().catch(async () => {
			await newPage.reload();
			second();
			third();
		});

		await newPage.waitFor(30000);
		close = close - 30000;
		await newPage
			.waitForSelector(`div.announcement-content`, { timeout: 900000 })
			.catch((e) => {
				close = close - 900000;
				console.log('Not Available');
			});
		const finish = await newPage
			.$('#announcement-modal-page-wrap > button.close')
			.catch((e) => {
				console.log('Not Available');
			});

		if (finish) {
			await finish.click().catch((e) => {
				console.log('Not Available');
			});
		} else {
			console.log('Last!!');
		}

		/* Uncomment this block only if chat is enabled */

		// await newPage.waitForSelector('div.panel-open-control', { timeout: 60000 }).catch(e =>{
		//     console.log('Not Available');
		// });
		// const chat = await newPage.$('div.panel-open-control > button.side-panel-toggle').catch(e =>{
		//     console.log('Not Available');
		// });
		// await chat.click().catch(e =>{
		//     console.log('Not Available');
		// });;
		// await newPage.waitFor(1000);
		// await newPage.click('button.channel-item').catch(e => 'chat not available');
		// let message = '';
		// if (new Date().getHours() >= 12) {
		//     message = 'G ood Afternoon'
		// } else {
		//     message = 'G ood Morning'
		// }
		// await newPage.type('textarea#message-input', message, {delay: 60}).catch('No chat today!');
		// await newPage.keyboard.press('Enter').catch('No chat today!');

		await newPage.waitFor(close);
		await browser.close();
	}
})();
