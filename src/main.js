const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url:'https:www.acfun.cn'},
    { logo:'B', url:'https://www.bilibili.com'},
];
const simplifyUrl = (url) => {
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/, '')//正则表达式，删除/开头的内容
};

const render = ()=>{
    $siteList.find('li:not(.last)').remove()//找到所有li唯独不要最后一个li
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon"><use href="#close-small"></use></svg>
          </div>
        </div>
    </li>`).insertBefore($lastLi)//添加到$siteList.find('li.last')的前面
    $li.on('click',()=>{
        window.open(node.url)
    })
    $li.on('click','.close', (e) => {
        console.log('这里')
        e.stopPropagation()//阻止冒泡
        hashMap.splice(index, 1)
        render()
    })
    })   
};
render()

$('.addButton').on('click', ()=>{
    let url = window.prompt('请问你要添加的网址是啥')
    if(url.indexOf('http')!==0){
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),//.toUpperCase()把一个字符变成大写
        logoType:'text',
        url: url
    });
    render()
});

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)//把对象转换成字符串
    /* console.log(typeof hashMap)打印出hashMap的数据类型
    console.log(hashMap)
    console.log(typeof string)打印出string的数据类型
    console.log(string) */
    localStorage.setItem('x',string)//在本地的存储里面设置一个x,值为string
}
$(document).on('keypress',(e) => {
    const {key} = e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})