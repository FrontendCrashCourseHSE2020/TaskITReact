import {Task} from "./HomeComponent";

interface User {
    userName: string;
    password: string;
}

class DataService {

    private static DB_URL = "http://localhost:4000";

    public async getAll(): Promise<Task[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/tasks`);

        let response: Response = await todoResponsePromise;

        let jsonPromise: Promise<Task[]> = response.json();

        return await jsonPromise;
    }

    public async getByUnixTime(unixTime: number): Promise<Task[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/tasks?creationDate=${unixTime}`);

        let response: Response = await todoResponsePromise;

        let jsonPromise: Promise<Task[]> = response.json();

        return await jsonPromise;
    }

    public async saveTask(newTask: Task): Promise<Task> {
        delete newTask.id;

        let postPromise = fetch(`${DataService.DB_URL}/tasks`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newTask)
        });

        return await (await postPromise).json();
    }

    public async login(userName: string, password: string): Promise<boolean> {
        let usersResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/users?userName=${userName}`);

        let response: Response = await usersResponsePromise;

        let jsonPromise: Promise<User[]> = response.json();

        let users = await jsonPromise;

        if (users.length === 0) {
            return false;
        }

        let user = users[0];

        if (user.password === password) {
            return true;
        }

        return false;
    }

}

export const dataService = new DataService();
