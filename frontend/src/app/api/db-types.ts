export interface RepoDetails {
	repoUrl: string;
	id: number;
	course: Course;
}

export interface Course {
	id: number;
	name: string;
	installationId: number;
	admins: any[];
}
