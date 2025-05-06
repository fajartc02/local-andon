function randomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(0);
}

let yamazumiDataRed = {
    data: [{
        name: "Preventive",
        data: [randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200)]
    }, {
        name: "Training",
        data: [randomNumber(20, 60),
            randomNumber(20, 60),
            // randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60)
        ]
    }, {
        name: "Repair",
        data: [randomNumber(10, 48),
            randomNumber(10, 48),
            // randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48)
        ]
    }, {
        name: "Safety",
        data: [randomNumber(10, 20),
            randomNumber(10, 20),
            // randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20)
        ]
    }, {
        name: "Project",
        data: [randomNumber(100, 200),
            randomNumber(100, 200),
            // randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200)
        ]
    }, {
        name: "Others",
        data: [randomNumber(30, 60),
            randomNumber(30, 60),
            // randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60)
        ]
    }],
    bgCol: ["#0fdb04", "#ff7f00", "#fc3232", "#1dff00", "#96ffeb", "#c2eae3"],
    labels: ["DWI RAMANT", "DIKA PRAST", "DIDI IRMAW", "BAYU MUSTA", "ERWIN MULY", "JEPRI SAMO", "MAULANA AD", "MOH. MUSBI", "MUHAMMAD S", "NIRVAN RIF", "SETYA SIDI", "SLAMET", "SUGENG RIY", "TRY SISWAN"],
    title: "Yamazumi Red Shift",
    yLabel: "Minutes",
}

let yamazumiDataWhite = {
    data: [{
        name: "Preventive",
        data: [randomNumber(170, 200), randomNumber(170, 200),
            // randomNumber(170, 200),
            randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200), randomNumber(170, 200)
        ]
    }, {
        name: "Training",
        data: [randomNumber(20, 60),
            randomNumber(20, 60),
            // randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60),
            randomNumber(20, 60)
        ]
    }, {
        name: "Repair",
        data: [randomNumber(10, 48),
            randomNumber(10, 48),
            // randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48),
            randomNumber(10, 48)
        ]
    }, {
        name: "Safety",
        data: [randomNumber(10, 20),
            randomNumber(10, 20),
            // randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20),
            randomNumber(10, 20)
        ]
    }, {
        name: "Project",
        data: [randomNumber(100, 200),
            randomNumber(100, 200),
            // randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200),
            randomNumber(100, 200)
        ]
    }, {
        name: "Others",
        data: [randomNumber(30, 60),
            randomNumber(30, 60),
            // randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60),
            randomNumber(30, 60)
        ]
    }],
    bgCol: ["#0fdb04", "#ff7f00", "#fc3232", "#1dff00", "#96ffeb", "#c2eae3"],
    labels: ["DWI SAPUTR", "ADISTYA PR", "ADI SUCIPT", "ACHMAD PRI", "EDY NURWAN", "HANDRY", "HARRY NOER", "MUGIYONO", "MUHAMAD BA", "MUHAMAD WA", "NANANG KUS", "RIKO KOSWA", "SUPRIYADI", "SUPRIYANTO", "VAIP JULY ", "WINARTO"],
    title: "Yamazumi White Shift",
    yLabel: "Minutes"
}

export {
    yamazumiDataWhite,
    yamazumiDataRed
}