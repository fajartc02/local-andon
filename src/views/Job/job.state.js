const STATE_TYPE_JOB = {
    containers: [{
            label: 'Preventive',
            options: [
                { value: 'SE Activity', text: 'SE Activity' },
                { value: 'Critical M/C C/M', text: 'Critical M/C C/M' },
                { value: 'Yokoten', text: 'Yokoten' },
                { value: 'Improvement', text: 'Improvement' },
                { value: 'TPM', text: 'TPM' },
                { value: 'RED TAG', text: 'RED TAG' },
                { value: 'C/M Temuan TPM', text: 'C/M Temuan TPM' },
                { value: 'C/M Potensi B/down', text: 'C/M Potensi B/down' },
                { value: 'Trainer OM', text: 'Trainer OM' },
            ]
        },
        { value: 'Training', text: 'Training' },
        { value: 'Repair', text: 'Repair' },
        { value: 'Safety', text: 'Safety' },
        { value: 'Project', text: 'Project' },
        {
            label: 'Others',
            options: [
                { value: '4S', text: '4S' },
                { value: 'Admin', text: 'Admin' },
                { value: 'Meeting', text: 'Meeting' },
                { value: 'Investigasi Problem', text: 'Investigasi Problem' },
            ]
        },
    ]
}

const STATE_GROUP = {
    container: [{
            type: 'SE Activity',
            group: 'Preventive',
            bgCol: '#ff009d'
        },
        {
            type: 'Critical M/C C/M',
            group: 'Preventive',
            bgCol: '#d000ff'
        },
        {
            type: 'Yokoten',
            group: 'Preventive',
            bgCol: '#5d00ff'
        },
        {
            type: 'Improvement',
            group: 'Preventive',
            bgCol: '#0083ff'

        },
        {
            type: 'TPM',
            group: 'Preventive',
            bgCol: '#00f6ff'
        },
        {
            type: 'RED TAG',
            group: 'Preventive',
            bgCol: '#00ffd0'
        },
        {
            type: 'C/M Temuan TPM',
            group: 'Preventive',
            bgCol: '#00ff7f'
        },
        {
            type: 'C/M Potensi B/down',
            group: 'Preventive',
            bgCol: '#bbff00'
        },
        {
            type: 'Trainer OM',
            group: 'Preventive',
            bgCol: '#fff200'
        },
        { type: 'Training', group: 'Training', bgCol: '#ff7f00' },
        { type: 'Repair', group: 'Repair', bgCol: '#f97a7a' },
        { type: 'Safety', group: 'Safety', bgCol: '#1dff00' },
        { type: 'Project', group: 'Project', bgCol: '#96ffeb' },
        { type: '4S', group: 'Others', bgCol: '#c2eae3' },
        { type: 'Admin', group: 'Others', bgCol: '#c2eae3' },
        { type: 'Meeting', group: 'Others', bgCol: '#c2eae3' },
        { type: 'Investigasi Problem', group: 'Others', bgCol: '#c2eae3' },
    ]
}
const STATE_GROUP_FIX = {
    container: [{
            type: 'Preventive',
            group: 'Preventive',
            bgCol: '#0fdb04'
        },
        { type: 'Repair', group: 'Repair', bgCol: '#fc3232' },
        // { type: 'Training', group: 'Training', bgCol: '#ff7f00' },
        { type: 'Safety', group: 'Safety', bgCol: '#1dff00' },
        { type: 'Project', group: 'Project', bgCol: '#96ffeb' },
        { type: 'Others', group: 'Others', bgCol: '#c2eae3' },
    ]
}
const STATE_LINES = {
    containers: [{
            name: "LPDC",
            dataProblem: [
                [],
                []
            ],
            member: []
        },
        {
            name: "HPDC",
            dataProblem: [
                [],
                []
            ],
            member: []
        },
        {
            name: "CAM SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CRANK SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER HEAD",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER BLOCK",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "ASSY LINE",
            dataProblem: [
                [],
                []
            ],
        },
    ],
    oee: [{
            name: "LPDC",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "HPDC",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "CAM SHAFT",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "CRANK SHAFT",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "CYLINDER HEAD",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "CYLINDER BLOCK",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "ASSY LINE",
            foee: null,
            factual: null,
            fplan: null
        },
    ],
    opts: [
        "ASSY LINE",
        "CRANK SHAFT",
        "CAM SHAFT",
        "CYLINDER HEAD",
        "CYLINDER BLOCK",
        "HPDC",
        "LPDC",
    ]
}

const STATE_TEMP_JOB = {
    containers: [{
            name: "ASSY LINE",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CRANK SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CAM SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER BLOCK",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER HEAD",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "LPDC",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "HPDC",
            dataProblem: [
                [],
                []
            ],
        },
    ],
}

const STATE_BLANK_JOB = {
    containers: [{
            name: "ASSY LINE",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CRANK SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CAM SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER BLOCK",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER HEAD",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "LPDC",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "HPDC",
            dataProblem: [
                [],
                []
            ],
        },
    ],
}

// [{ "name": "Preventive", "data": [1, 2, 3, 1, 2, 3, 2] }, { "name": "Training", "data": [1, 2, 3, 1, 2, 3, 2] }, { "name": "Repair", "data": [1, 2, 3, 1, 2, 3, 2] }, { "name": "Safety", "data": [1, 2, 3, 1, 2, 3, 2] }, { "name": "Project", "data": [1, 2, 3, 1, 2, 3, 2] }, { "name": "Others", "data": [1, 2, 3, 1, 2, 3, 2] }]


export {
    STATE_TYPE_JOB,
    STATE_LINES,
    STATE_TEMP_JOB,
    STATE_BLANK_JOB,
    STATE_GROUP,
    STATE_GROUP_FIX
}