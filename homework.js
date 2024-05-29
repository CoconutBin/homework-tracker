class Subject {
    constructor(name, id, type){
        this.name = name
        this.id = id
        this.type = type
    }
}

class Homework {
    constructor(subject, isGroupWork, dueDate, points, description) {
        this.subjectName = subject.name ?? undefined
        this.subjectID = subject.id ?? undefined
        this.subjectType = subject.type ?? undefined
        this.isGroupWork = isGroupWork ?? false
        this.dueDate = dueDate.toDateString() ?? "Unknown"
        this.description = description ?? ""
        this.points = points ?? undefined
    }

    start() {
        this.timeStarted = Date.now()
    }

    get subject() {
        return {
            id: this.subjectID,
            name: this.subjectName,
            type: this.subjectType,
        };
    }

    get homeworkObject() {
        return {
            subject: this.subject,
            isGroupWork: this.isGroupWork,
            dueDate: this.dueDate,
            description: this.description,
            points: this.points,
            timeStarted: this.timeStarted
        }
    }

    set homeworkObject(obj) {
        this.subject = obj.subject
        this.isGroupWork = obj.isGroupWork
        this.dueDate = obj.dueDate
        this.description = obj.description
        this.points = obj.points
        this.timeStarted = obj.timeStarted
    }

    set subject(obj) {
        this.subjectID = obj.id
        this.subjectName = obj.name
        this.subjectType = obj.type
    }
}

/*
{
    "subject": {
        "id": "",
        "name": "",
        "type": "",
    }
    "isGroupWork": false,
    "dueDate": "",
    "description": "",
    "points": ""
}
*/