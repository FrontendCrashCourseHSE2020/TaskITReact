export class Task {

    id?: number;

    description: string;

    creationDate: number;

    author: string = "admin";

    constructor(id: number, description: string, creationDate: number) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
    }

}

// Класс для работы с сервером
class DataService {

    private static DB_URL = "http://localhost:4000";

    /**
     * Получить все Task'и пользователя
     */
    public async getTasks(): Promise<Task[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/todo?author=admin`);

        let response: Response = await todoResponsePromise;

        let jsonPromise: Promise<object[]> = response.json();

        let objects = await jsonPromise;

        return objects.map((value: any) => {
            return new Task(value["id"], value["description"], value["creationDate"]);
        });
    }

    /**
     * Добавить новый Task на сервер
     * @param newItem новый Task
     */
    public async saveItem(newItem: Task): Promise<Task> {
        delete newItem.id;
        let postPromise = fetch(`${DataService.DB_URL}/todo`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newItem)
        });
        return await (await postPromise).json();
    }

    /**
     * Удалить Task
     * @param id идентификатор item'a
     * @returns true, если получилось удалить
     */
    public async deleteItem(id: number): Promise<boolean> {
        let deletePromise = fetch(`${DataService.DB_URL}/todo/${id}`, {
            method: "DELETE"
        });

        return (await deletePromise).ok;
    }

}

let dataService = new DataService();
export default dataService;
