function getUItittleUrl(name) {
    return "ui/load/tittle/" + name + ".png";
}
function getSkillUrl(name) {
    var str = "skill/" + name + getBaseUrl() + ".txt";
    return str.replace(".txt", "_byte.txt");
}
function getModelUrl(name) {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getModelUIUrl(name) {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getMapUrl(name) {
    return "map/" + name + getBaseUrl() + ".txt";
}
function getBaoxiangUrl() {
    return "changjing/baoxiang/100001.txt";
}
function getRoleUrl(name) {
    return "role/" + name + getBaseUrl() + ".txt";
}
function getZipMapUrl(name) {
    return "map/" + name + "/";
}
/**标准化数字 */
function Snum($num) {
    return "123";
}
function getEffectUIUrl(name) {
    return "ui/load/effect/" + name + ".png";
}
function getKeyProById($id) {
    return "cc";
}
