    //选择器 html .test a
    function _(selectorStr){
        if(typeof(document.querySelectorAll)=='function'){
            return document.querySelectorAll(selectorStr);
        }
        var documentAll=document.getElementsByTagName('*');
        var selectorStr=selectorStr.replace(/\s+/g,' ').replace(/^\s+/,'').replace(/\s+$/,'');
        var selectorArr=selectorStr.split(' ');
            var selectorNodesBase=[];//存放匹配最底层的元素
            var selectorNodesResult=[];//存放过滤后的元素
            var selectorBase=selectorArr.pop();
            //获取所有的最底层Dom元素
            if(selectorBase.indexOf('.')!=-1){//如果是class
                var queryClassName=selectorBase.substr(1);
                if(typeof(getElementsByClassName)=='function'){
                    var eleClassName=document.getElementsByClassName('queryClassName');
                    for(var x=0;x<eleClassName.length;x++){
                        selectorNodesBase.push(eleClassName[x]);
                    }
                }else{
                    for(var i=0;i<documentAll.length;i++){
                        if(typeof(documentAll[i].className)!='undefined'){
                            var eleClassNameN=' '+documentAll[i].className+' ';
                            if(eleClassNameN.indexOf(' '+queryClassName+' ')!=-1){
                                selectorNodesBase.push(documentAll[i]);
                            };
                        }
                    }
                }
            }else if(selectorBase.indexOf('#')!=-1){//如果是ID
                selectorNodesBase.push(document.getElementById(selectorBase.substr(1)));

            }else{//如果是TagName
                var eleTagName=document.getElementsByTagName(selectorBase);
                for(var x=0;x<eleTagName.length;x++){
                    selectorNodesBase.push(eleTagName[x]);
                }
            }
            //过滤所有的符合底层的元素

            for(var i=0;i<selectorNodesBase.length;i++){
                var filterEachElement=function(ele,selectorArr){
                    var isMatch=false,eleBase=ele,selectorArr;
                    //已知，最底层元素ele和selectorArrNow（父级所有选择器）
                    //判断 该元素是否在这个选择器下面
                    //递归向上查找，找到上个节点，返回上个节点，继续查找上个节点上面的选择器对应的元素
                    //找到html根节点前找到了，isMath=true
                    var queryParent=function(eleParentNode,selectorStr){
                        if(eleParentNode==document){
                            isSelectorStr=false;
                        }else{
                            var isSearch=false;
                            if(selectorStr.indexOf('.')!=-1){//如果是class
                                var queryClassName=selectorStr.substr(1);
                                    if(typeof(eleParentNode.className)!='undefined'){
                                        var eleClassNameN=' '+eleParentNode.className+' ';
                                        if(eleClassNameN.indexOf(' '+queryClassName+' ')!=-1){
                                            isSearch=true;
                                            rstParent=eleParentNode;
                                        };
                                }
                            }else if(selectorStr.indexOf('#')!=-1){//如果是ID
                                if(document.getElementById(selectorStr.substr(1))==eleParentNode){
                                    isSearch=true;
                                            rstParent=eleParentNode;
                                }
                            }else{//如果是TagName
                                //console.log(eleParentNode,selectorStr);
                                //console.log(eleParentNode.tagName.toLowerCase(),selectorStr);
                                if(eleParentNode.tagName.toLowerCase()==selectorStr.toLowerCase()){
                                        isSearch=true;
                                        rstParent=eleParentNode;
                                    }
                            }
                            if(!isSearch){
                                //console.log(ele,eleParentNode.parentNode,selectorStr);
                                queryParent(eleParentNode.parentNode,selectorStr);
                            }
                        }
                    }
                    var t=selectorArr.length;
                    if(t==0){
                        isMatch=true;
                    }else{
                        var eleParentNodeNow=ele,rstParent='',isSelectorStr=true;
                        while(t--){//按选择器从下到上一级一级查找
                            var selectorStr=selectorArr[t];
                            if(!isSelectorStr){
                                return;
                            }
                            if(selectorArr[t]=='*'){
                                if(eleParentNodeNow.parentNode==document){
                                    isSelectorStr=false;
                                }else{
                                    eleParentNodeNow=eleParentNodeNow.parentNode;
                                }
                            }else{
                                queryParent(eleParentNodeNow.parentNode,selectorArr[t]);
                                eleParentNodeNow=rstParent;
                            }
                            if(t==0){
                                if(isSelectorStr){
                                    isMatch=true;
                                }
                            }
                        }
                    }
                    if(isMatch){
                        selectorNodesResult.push(eleBase);
                    }
                }
                filterEachElement(selectorNodesBase[i],selectorArr);
            }
            return selectorNodesResult;
       // console.log(selectorNodes);
    }
