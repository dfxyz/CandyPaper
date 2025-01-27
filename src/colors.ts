// noinspection NonAsciiCharacters

import Color from './Color.ts';
import * as utils from './utils.ts';

export const colors: Map<string, Color> = new Map();
export const hex2ColorNames: Map<string, string[]> = new Map();

export interface ColorTableItem {
  color: Color;
  aliases: string[];
}

export const colorTable = _({
  fg: {
    '210,50,25': '文本搜索结果,VIM_WildMenu',
    '210,50,50': '黑,默认,标识符',
    '210,50,75': '白,折叠文本,未使用代码,过期日志,VIM_状态栏_未选中',
    '210,10,75': '次要文本',
    '0,75,60': '全局变量,常量,宏参数,自定义关键字4',
    '0,90,90': '红,未知符号,终端错误输出,日志_错误',
    '15,75,75': '数字,标记语言实体',
    '45,100,50': '黄,弱警告,特殊注释,注解,宏,日志_警告',
    '75,100,45': '注释',
    '135,100,50': '绿,关键字,自定义关键字1,拼写错误,日志_信息,MARKDOWN标题,SHELL命令,内置函数名',
    '180,100,45': '青,字符串,终端用户输入,日志_调试,RUST生命周期,重载操作符,正则表达式',
    '210,100,80': '湖蓝,链接',
    '240,80,80': '蓝,类名,转义字符,跳转标签,日志_冗余,泛型参数,VIM_特殊字符',
    '270,80,80': '已跟踪链接,成员属性,标记语言属性,自定义关键字2,参数名',
    '300,75,75': '桃红,静态属性,自定义关键字3',
  },
  bg: {
    '90,10,100': '默认',
    '75,20,98': '当前行,光标下面包屑标签',
    '90,30,95': '选中文本',
    '120,10,95': '折叠文本',
    '120,20,80': '带高亮的折叠文本',
    '120,10,100': '自动类型转换',
    '120,30,98': 'VCS注释背景1',
    '120,20,98': 'VCS注释背景2,已选中面包屑标签,用IDE执行的命令,VIM_状态栏',
    '120,10,98': 'VCS注释背景3',
    '120,5,98': 'VCS注释背景4',
    '120,2,98': 'VCS注释背景5',
    '120,5,95': 'VIM_补全菜单',
    '120,5,90': 'VIM_状态栏_未选中',
    '120,10,75': 'VIM_补全菜单拖动条',
    '180,30,95': '成对括号,成对标记',
    '120,15,95': 'DIFF_新增文本',
    '210,15,95': 'DIFF_改动文本',
    '150,5,95': 'DIFF_改动文本_次要',
    '15,15,95': 'DIFF_冲突文本',
    '90,5,90': 'DIFF_移除文本',
    '0,20,100': '错误,非成对括号,无效转义字符',
    '45,40,100': '警告',
    '60,60,100': '待办事项,VIM_WildMenu',
    '135,10,100': '嵌入代码,模板语言',
    '120,30,100': '文本搜索结果',
    '240,20,100': '标识符搜索结果_读',
    '300,20,100': '标识符搜索结果_写',
    '240,10,100': '光标下标识符_读',
    '330,10,100': '光标下标识符_写',
    '30,10,100': 'RUST_UNSAFE',
  },
  stripe: {
    '210,50,25': '书签',
    '210,75,100': '待办事项',
    '120,100,75': '文本搜索结果',
    '265,50,100': '光标下标识符_读',
    '315,50,100': '光标下标识符_写',
    '0,75,100': '错误',
    '30,75,100': '警告',
    '45,50,100': '弱警告',
    '135,30,75': 'DIFF_新增文本',
    '210,50,100': 'DIFF_改动文本',
    '15,50,100': 'DIFF_冲突文本',
    '0,0,75': 'DIFF_移除文本',
  },
  gutter: {
    '120,50,80': '新增文本',
    '210,50,100': '改动文本',
    '0,40,100': '移除文本',
    '45,100,100': '空白字符改动',
  },
  line: {
    '120,10,90': '缩进对齐线,制表符,函数分隔线,DIFF_不变片段折叠线',
    '120,10,80': '行宽对齐线',
    '120,10,70': '光标下缩进对齐线',
    '120,50,75': '光标下括号对应的缩进对齐线',
  },
});

function _(raw: Record<string, Record<string, string>>): Record<string, Record<string, ColorTableItem>> {
  const convertedColorTable: Record<string, Record<string, ColorTableItem>> = {};
  function addColor(key: string, value: Color) {
    if (colors.has(key)) {
      throw new Error(`color '${key}' already defined`);
    }
    colors.set(key, value);
  }
  for (const [groupName, groupObjects] of Object.entries(raw)) {
    const convertedGroupObjects: Record<string, ColorTableItem> = convertedColorTable[groupName] = {};
    for (const [hsvString, aliasesString] of Object.entries(groupObjects)) {
      const [h, s, v] = utils.parseHsvString(hsvString);
      const color = Color.fromHSV(h, s, v);
      const aliases = aliasesString.split(',').map((x) => x.trim()).filter((x) => x.length > 0);
      convertedGroupObjects[hsvString] = { color, aliases };
      for (const alias of aliases) {
        const key = `${groupName}.${alias}`;
        addColor(key, color);
        let colorNames = hex2ColorNames.get(color.hex);
        if (colorNames === undefined) {
          colorNames = [];
          hex2ColorNames.set(color.hex, colorNames);
        }
        colorNames.push(key);
      }
    }
  }
  return convertedColorTable;
}
