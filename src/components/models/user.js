export default class User {
	constructor(id = 0, name, surname, email) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.created_at = Date.now();
		this.updated_at = Date.now();
	}
}
