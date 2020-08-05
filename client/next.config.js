const withCSS = require('@zeit/next-css');

// withCSS는 페이지 전환 시 잠시 svg, img 파일들이 크게 보이는 것을 예방하기 위한 설정
module.exports = withCSS({
  /* config options here */
  cssModules: true,
})
