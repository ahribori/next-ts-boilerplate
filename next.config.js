// next.config.js
const withSass = require('@zeit/next-sass');

module.exports = withSass({
    /**
     * 빌드파일 경로 설정.
     * Next 프로젝트 루트가 src로 설정되어있어서 (server.js에서 확인)
     * 프로젝트 루트에 빌드파일을 뽑으려면 ../로 루트로 나와줘야한다.
     */
    distDir: '../dist',

    /**
     * 파일시스템 기반의 routing 설정 (pages 폴더)
     */
    useFileSystemPublicRoutes: true,

    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
        minimize: true,
    },
    poweredByHeader: false,


    /**
     * 서버에서만 접근 가능한 환경 변수
     */
    serverRuntimeConfig: {},

    /**
     * 서버, 클라 모두 접근 가능한 환경 변수
     */
    publicRuntimeConfig: {},

    webpack: (cfg, { dev, isServer }) => {
        return cfg;
    }

});
