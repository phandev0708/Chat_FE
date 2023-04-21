export interface TaskCreate {
    ColumnId: string;
    ProjectId: string;
    TaskName: string;
    UserProcess: string;
    StartDate?: Date;
    EndDate?: Date;
    Description: string;
    TaskIndex?: number;
    UserFollowerList?: string[];
}
export interface TaskIsComplete {
    ID: string;
    colorTagTask?: any[];
    IsComplete: boolean;
    ColumnId?: string;
    ProjectId?: string;
    TaskName?: string;
    UserProcess?: string;
    StartDate?: Date;
    EndDate?: Date;
    Description?: string;
    TaskIndex?: number;
}
export interface ChangeTaskName {
    ID: string;
    IsComplete?: boolean;
    ColumnId?: string;
    ProjectId?: string;
    TaskName: string;
    UserProcess?: string;
    StartDate?: Date;
    EndDate?: Date;
    Description?: string;
    TaskIndex?: number;
}
export interface ChangeTaskDescription {
    ID: string;
    IsComplete?: boolean;
    ColumnId?: string;
    ProjectId?: string;
    TaskName?: string;
    UserProcess?: string;
    StartDate?: Date;
    EndDate?: Date;
    Description: string;
    TaskIndex?: number;
}

export interface TaskFollower {
    TaskId: string;
    UserAddList?: string[];
    UserRemoveList?: string[];
}
export interface ChangeTaskDate {
    ID: string;
    IsComplete?: boolean;
    ColumnId?: string;
    ProjectId?: string;
    TaskName?: string;
    UserProcess?: string;
    StartDate: Date;
    EndDate?: Date;
    Description?: string;
    TaskIndex?: number;
}

interface PostFileTaskChild {
    FileName: string;
    Path: string;
}

export interface PostFileTask {
    TaskId: string;
    FileUploads: PostFileTaskChild[];
}

export interface TaskUserProcess {
    ID: string;
    IsComplete?: boolean;
    ColumnId?: string;
    ProjectId?: string;
    TaskName?: string;
    UserProcess: string;
    StartDate?: Date;
    EndDate?: Date;
    Description?: string;
    TaskIndex?: number;
}
export interface SearchTaskModel {
    ProjectId?: string;
    Key: string;
}
export interface UserTaskViewer {
    TaskId: string;
}
