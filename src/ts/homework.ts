class Subject {
    name: string
    id?: string
    type?: string

    constructor(name, id, type){
        this.name = name
        this.id = id
        this.type = type
    }
}

class Homework {
    subjectName: string
    subjectID: string
    subjectType: string
    isGroupWork: boolean
    isImportant: boolean
    dueDate: string
    description: string
    points: string
    timeStarted: number
    timeEnded: number

    constructor(subject, isGroupWork?, dueDate?, points?, description?) {
        this.subjectName = subject.name ?? undefined
        this.subjectID = subject.id ?? undefined
        this.subjectType = subject.type ?? undefined
        this.isGroupWork = isGroupWork ?? false
        this.dueDate = dueDate ?? "Unknown"
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
            isImportant: this.isImportant,
            dueDate: this.dueDate,
            description: this.description,
            points: this.points,
            timeStarted: this.timeStarted,
            timeEnded: this.timeEnded
        }
    }

    set homeworkObject(obj) {
        this.subject = obj.subject
        this.isGroupWork = obj.isGroupWork
        this.isImportant = obj.isImportant
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

class Schedule {
    schedule: string[][]
    startingTime: string
    interval: number
    scheduleType: "id"|"name"
    subjects: Subject[]

    constructor(){
        this.schedule
        this.startingTime
        this.interval
        this.subjects
        this.scheduleType
    }

    get currentSubject(){
        const currentDate = new Date()
        const currentDay = currentDate.getDay()
        const currentTime = (currentDate.getHours() * 60) + currentDate.getMinutes();
        const startingTimeNumber = (parseInt(this.startingTime.split(":")[0]) * 60) + parseInt(this.startingTime.split(":")[1])

        return this.schedule[currentDay][Math.floor((currentTime - startingTimeNumber) / this.interval)]
    }

    set scheduleObject(obj){
        this.schedule = obj.schedule
        this.startingTime = obj.startingTime
        this.interval = obj.interval
        this.subjects = obj.subjects
        this.scheduleType = obj.scheduleType
    }
}

const currentSchedule = new Schedule()

if(JSON.parse(localStorage.getItem("currentSchedule")) != null){
    currentSchedule.scheduleObject = JSON.parse(localStorage.getItem("currentSchedule"))
}
