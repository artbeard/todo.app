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

function setUser(uid: string)
{
	setCookieUser(uid);
	window.localStorage.setItem('uid', uid);
}

export function createUser()
{
	fetch(apiPoints.makeUser, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json;charset=utf-8'
		},
	})
	.then(response => {
		if (response.status === 200)
		{
			
		}
	})
	.catch((err)=>{
		console.log('Ошибка set completed', err)
	});
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