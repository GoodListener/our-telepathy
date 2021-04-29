class Status {
    constructor(statusInfo) {
        this.status = statusInfo.status;
        this.buttonColor = statusInfo.buttonColor;
        this.lineColor = statusInfo.lineColor;
        this.label = statusInfo.label;
    }
}

class StatusList {
    constructor() {
        this.list = [
            new Status({
                status: 'working',
                buttonColor: 'primary',
                lineColor: '#C6BDFB',
                label: '업무중'
            }),
            new Status({
                status: 'meeting',
                buttonColor: 'primary',
                lineColor: '#86B7E5',
                label: '회의중'
            }),
            new Status({
                status: 'meal',
                buttonColor: 'secondary',
                lineColor: '#75CD83',
                label: '식사중'
            }),
            new Status({
                status: 'rest',
                buttonColor: 'secondary',
                lineColor: '#FFCBC0',
                label: '휴식중'
            }),
            new Status({
                status: 'offwork',
                buttonColor: 'default',
                lineColor: '#8F95A4',
                label: '퇴근'
            })
        ]
    }

    /**
     * 
     * @param {String} status 
     * @returns {Status}
     */
    getStatus(status) {
        const statusInfo = this.list.find(item => item.status === status);
        return statusInfo ? statusInfo : new Status({
            status: 'default',
            buttonColor: 'default',
            lineColor: '#eee',
            label: '준비중'
        });
    }
}



export default new StatusList();