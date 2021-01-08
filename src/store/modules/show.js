const ADD_ITEMNUM = 'ADD_ITEMNUM'
const REMBER_ANSWER = 'REMBER_ANSWER'
const INITIALIZE_DATA = 'INITIALIZE_DATA'
const COMPUTED_SCORE = 'COMPUTED_SCORE'
const  state = {
        itemNum: 1, // 第几题
        result: [], // 这个数组用来记录
        totleScore: 0,
        totleNum: 0,
        rightResult:[2, 1, 3, 3, 2],
        problems:[
            {
                stem: '1、数字签名技术属于信息系统安全管理中保证信息（）技术。',
                trueanser: 2,
                answer:[
                    {
                        // optionNumber这个当做计算成绩的索引值
                        optionNumber: 0,
                        describe: '保密性'
                    },
                    {
                        optionNumber: 1,
                        describe: '可用性'
                    },
                    {
                        optionNumber: 2,
                        describe: '完整性'
                    },
                    {
                        optionNumber: 3,
                        describe: '可靠性'
                    },
                ],
            },
            {
                stem:'2、以下关于计算机病毒与蠕虫的特点比较的叙述中，正确的是（）。',
                trueanser: 1,
                answer:[
                    {
                        // optionNumber这个当做计算成绩的索引值
                        optionNumber: 0,
                        describe: '在传染机制中，蠕虫是通过主要程序运行的'
                    },
                    {
                        optionNumber: 1,
                        describe: '为系统打补丁，能有效预防蠕虫，但不能有效预防病毒'
                    },
                    {
                        optionNumber: 2,
                        describe: '在触发机制中，蠕虫的触发者是计算机使用者'
                    },
                    {
                        optionNumber: 3,
                        describe: '蠕虫和病毒都是寄生模式生存'
                    },
                ],
            },
            {
                stem: '3、下列算法中，不属于公开密钥加密算法的是（） 。',
                trueanser: 3,
                answer:[
                    {
                        // optionNumber这个当做计算成绩的索引值
                        optionNumber: 0,
                        describe: 'ECC'
                    },
                    {
                        optionNumber: 1,
                        describe: 'DSA'
                    },
                    {
                        optionNumber: 2,
                        describe: 'RSA'
                    },
                    {
                        optionNumber: 3,
                        describe: 'DES'
                    },
                ],
            },
            {
                stem: '4、信息系统的安全威胁分成七类，其中不包括（）。',
                trueanser: 3,
                answer:[
                    {
                        // optionNumber这个当做计算成绩的索引值
                        optionNumber: 0,
                        describe: '自然事件风险和人为事件风险'
                    },
                    {
                        optionNumber: 1,
                        describe: '软件系统风险和软件过程风险'
                    },
                    {
                        optionNumber: 2,
                        describe: '项目管理风险和应用风险'
                    },
                    {
                        optionNumber: 3,
                        describe: '功能风险和效率风险 '
                    },
                ],
            },
            {
                stem: '5、很多系统在登录时都要求用户输入以图片形式显示的一个字符串，其作用是（）。',
                trueanser: 2,
                answer:[
                    {
                        // optionNumber这个当做计算成绩的索引值
                        optionNumber: 0,
                        describe: '阻止没有键盘的用户登录'
                    },
                    {
                        optionNumber: 1,
                        describe: '欺骗非法用户'
                    },
                    {
                        optionNumber: 2,
                        describe: '防止用户利用程序自动登录'
                    },
                    {
                        optionNumber: 3,
                        describe: '限制登录次数'
                    },
                ],
            },
        ]
    }
const  mutations = {
        //点击进入下一题
        [ADD_ITEMNUM] (state) {
            state.itemNum ++;
        },
        //记录答案
        [REMBER_ANSWER] (state, id) {
            state.result.push(id);
        },
        
        // 初始化信息
        [INITIALIZE_DATA] (state) {
            state.itemNum = 1;
            state.result = [];
            state.totleScore = 0
            state.totleNum = 0
        },
        [COMPUTED_SCORE] (state) {
            state.result.forEach((item, index) => {
                if (item === state.rightResult[index]) {
                    state.totleScore += 20;
                    state.totleNum += 1;
                }
            })
        }
    }
const  actions = {
        addNum ({ commit, state }, id) {
            //点击下一题，记录答案id，判断是否是最后一题，如果不是则跳转下一题
            commit('REMBER_ANSWER', id);
            if (state.itemNum < state.problems.length) {
                commit('ADD_ITEMNUM');
            }
        },
        //初始化信息
        initializeData ({ commit }) {
            commit('INITIALIZE_DATA');
        },
        // 计算总分
        countScore ({ commit }) {
            commit('COMPUTED_SCORE');
        }

    }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
