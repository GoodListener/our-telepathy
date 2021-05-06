class StatusDTO {
    constructor(statusInfo) {
        this.status = statusInfo.status;
        this.buttonColor = statusInfo.buttonColor;
        this.lineColor = statusInfo.lineColor;
        this.label = statusInfo.label;
    }
}

class StatusDTOList {
    constructor() {
        this.list = [
            new StatusDTO({
                status: 'working',
                buttonColor: 'primary',
                lineColor: '#C6BDFB',
                label: '업무중'
            }),
            new StatusDTO({
                status: 'meeting',
                buttonColor: 'primary',
                lineColor: '#86B7E5',
                label: '회의중'
            }),
            new StatusDTO({
                status: 'meal',
                buttonColor: 'secondary',
                lineColor: '#75CD83',
                label: '식사중'
            }),
            new StatusDTO({
                status: 'rest',
                buttonColor: 'secondary',
                lineColor: '#FFCBC0',
                label: '휴식중'
            }),
            new StatusDTO({
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
     * @returns {StatusDTO}
     */
    getStatus(status) {
        const statusInfo = this.list.find(item => item.status === status);
        return statusInfo ? statusInfo : new StatusDTO({
            status: 'default',
            buttonColor: 'default',
            lineColor: '#eee',
            label: '준비중'
        });
    }
}



export default new StatusDTOList();