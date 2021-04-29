export default class Member {
    constructor(memberInfo) {
        this.id = memberInfo.id;
        this.name = memberInfo.name;
        this.status = memberInfo.status;
        this.team = memberInfo.team;
    }
}