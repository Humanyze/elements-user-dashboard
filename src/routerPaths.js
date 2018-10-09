const publicUrl = process.env.PUBLIC_URL;
console.error(publicUrl);
const basePaths = {
    basePath     : publicUrl,
    login        : '/login',
    collaboration: '/collaboration',
    exploration  : '/exploration',
    visibility   : '/visibility',
    communication: '/communication',
};

const paths = {
    ...basePaths,

    collaboration__cohesion: `${basePaths.collaboration}/cohesion`,
    collaboration__interaction: `${basePaths.collaboration}/interaction`,
    collaboration__allocation: `${basePaths.collaboration}/allocation`,

    exploration__frequency: `${basePaths.exploration}/frequency`,
    exploration__time: `${basePaths.exploration}/time`,
    exploration__distinct: `${basePaths.exploration}/distinct`,

    visibility__manager: `${basePaths.visibility}/manager`,

    communication__patterns: `${basePaths.communication}/patterns`
};


export default paths;