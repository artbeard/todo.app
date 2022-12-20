import apiPoints from "./apiPoints";

function getCookieUser(): string | undefined {
	let cookies: string[] = document.cookie.split('; ');
	return cookies.find((row: string) => row.startsWith('uid='))?.split('=')[1];
}

function setCookieUser(value: string){
	let expires: string = new Date( + new Date() + (60 * 60 * 24 * 365)).toUTCString();
	let path: string = '/';
	let data = `uid=` + encodeURIComponent(value) + '; ';
	data += path + '; ';
	data += expires + '; ';
	document.cookie = data;
}

export function setUser(uid: string)
{
	setCookieUser(uid);
	window.localStorage.setItem('uid', uid);
}

export function createUser(userName: string): Promise<boolean>
{
	return new Promise((resolve, reject) => {
		fetch(apiPoints.makeUser, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({name: userName})
		})
		.then(response => {
			if (response.status >= 200 && response.status < 300)
			{
				console.log('Создание пользователя');
				resolve(response.json())
			}
			else
			{
				reject(false)
			}
		})
		.catch((err)=>{
			console.log('Ошибка set completed', err)
			reject(false);
		});
	})
}

export function getUser()
{
	let currntUser: string | undefined = getCookieUser();
	if (currntUser === undefined)
	{
		currntUser = window.localStorage.getItem('uid') ?? undefined;
		if (!currntUser)
		{
			return undefined;
		}
	}
	setUser(currntUser); //Обновляем данные
	return currntUser;
}