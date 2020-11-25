import {Task} from "./App";


class DataService {

    private static DB_URL = "http://localhost:4000";

    public async getAll(): Promise<Task[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/tasks`);

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

}

export const dataService = new DataService();
