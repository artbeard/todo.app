import apiPoints from "./apiPoints";
import { IUser } from '../use/models';

function getCookie(name: string): string | undefined {
	let cookies: string[] = document.cookie.split('; ');
	return cookies.find((row: string) => row.startsWith(`${name}=`))?.split('=')[1];
}

export function setCookie(name:string, value: string | number){
	let expires: string = new Date( + new Date() + (1000 * 60 * 60 * 24 * 365)).toUTCString();
	let path: string = '/';
	let data = `${name}=` + encodeURIComponent(value) + '; ';
	data += 'Path=' + path + '; ';
	data += 'Expires=' + expires + '; ';
	document.cookie = data;
}

export function createUser(userName: string): Promise<IUser>
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
			console.log('Ошибка create user', err)
			reject(false);
		});
	})
}

export function getUid(): number | undefined
{
	let currntUid: string | number | undefined = getCookie('uid');
	if (!currntUid)
	{
		// currntUid = window.localStorage.getItem('uid') ?? undefined;
		// if (!currntUid)
		// {
		// 	return undefined;
		// }
		// else
		// {
		// 	//обновляем данные в cookies
		// 	setCookie('uid', currntUid);
		// }
		return undefined;
	}
	return  (+ currntUid);
}

export function getToken(): string | undefined
{
	let currntToken: string | undefined = getCookie('token');
	if (currntToken === undefined)
	{
		// currntToken = window.localStorage.getItem('token') ?? undefined;
		// if (!currntToken)
		// {
		// 	return undefined;
		// }
		// else
		// {
		// 	//обновляем данные в cookies
		// 	setCookie('token', currntToken);
		// }
		return undefined;
	}
	return currntToken;
}


export function getUser(uid: number | undefined = undefined, token: string | undefined = undefined): Promise<IUser>
{
	return new Promise((resolve, reject) => {
		fetch( uid && token
			? apiPoints.setUser.replace(':uid', String(uid)).replace(':token', token)
			: apiPoints.getUser, {
			method: 'GET',
			headers: {
			  'Content-Type': 'application/json;charset=utf-8'
			},
		})
		.then(response => {
			if (response.status >= 200 && response.status < 300)
			{
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