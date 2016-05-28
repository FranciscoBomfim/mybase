
//sValidation=nyfjs
//sCaption=Syntax highlight ...
//sHint=Highlight source code by syntax of programming language
//sCategory=MainMenu.Edit
//sLocaleID=p.SyntaxHighlight
//sAppVerMin=6.0.7
//sShortcutKey=

var _lc=function(sTag, sDef){return plugin.getLocaleMsg(sTag, sDef);};
var _lc2=function(sTag, sDef){return _lc(plugin.getLocaleID()+'.'+sTag, sDef);};

var _trim=function(s){return (s||'').replace(/^\s+|\s+$/g, '');};
var _trim_cr=function(s){return (s||'').replace(/\r+$/g, '');};

try{
	var xNyf=new CNyfDb(-1);

	if(xNyf.isOpen()){

		//if(!xNyf.isReadonly()){

			var nFontSize=10; //(pt);
			var sFontName='Courier New'; //avoid font names containing Asian characters;

			var sColorNormal='\\red0\\green0\\blue0'; //cf1
			var sColorRemarks='\\red0\\green128\\blue0'; //cf2
			var sColorStrings='\\red128\\green0\\blue128'; //cf3
			var sColorNumbers='\\red255\\green0\\blue0'; //cf4

			var sColorKeywords='\\red0\\green0\\blue255'; //cf5

			var sColorReservedTags1='\\red128\\green0\\blue255'; //cf6
			var sColorReservedTags2='\\red0\\green64\\blue128'; //cf7
			var sColorReservedTags3='\\red255\\green128\\blue0'; //cf8
			var sColorReservedTags4='\\red0\\green128\\blue192'; //cf9

			var sTags_Cpp=
				//for C++ Macros
				'include,defined,define,ifdef,endif,elif,pragma,null'

				//for C (ISO/ANSI C90)
				+ ',auto,break,case,char,const,continue,default,do,double,else,enum,extern'
				+ ',float,for,goto,if,inline,int,long,register,restrict,return'
				+ ',short,signed,sizeof,static,struct,switch,typedef'
				+ ',union,unsigned,void,volatile,while'

				//for C (ISO/ANSI C99 appendix)
				+ ',_Bool,_Complex,_Imaginary'

				//for C++
				+ ',and,and_eq,asm,bitand,bitor,bool,catch,class,compl'
				+ ',const_cast,delete,dynamic_cast,explicit,export,false,friend'
				+ ',mutable,namespace,new,not,not_eq,operator,or,or_eq'
				+ ',private,protected,public,reinterpret_cast,static_cast'
				+ ',template,this,throw,true,try,typeid,typename,using'
				+ ',wchar_t,virtual,xor,xor_eq'

				//for C++0x
				+ ',alignof,char16_t,char32_t,constexpr,decltype,noexcept,nullptr'
				+ ',static_assert,thread_local'
				;

			var sTags_Stl=
				'std,exception'
				+ ',string,list,vector,stack,pair,map,set,multimap,multiset,queue,deque'
				+ ',priority_queue,bitset,valarray'
				+ ',cin,cout,cerr,clog,wcin,wcout,wcerr,wclog'
				+ ',ios,fstream,wfstream,ifstream,wifstream,ofstream,wofstream'
				+ ',istream,wistream,ostream,wostream,streambuf,wstreambuf'
				+ ',stringstream,wstringstream,istringstream,wistringstream,ostringstream,wostringstream'
				+ ',strstream,istrstream,wistrstream,ostrstream,wostrstream'
				+ ',iterator,const_iterator,reverse_iterator,const_reverse_iterator'
				+ ',back_insert_iterator,front_insert_iterator,insert_iterator'
				+ ',istream_iterator,ostream_iterator,istreambuf_iterator,ostreambuf_iterator'
				;

			var sTags_Java=
				'abstract,boolean,break,byte,case,catch,char,class,continue,default'
				+ ',do,double,else,enum,extends,false,final,finally,float,for'
				+ ',if,implements,import,instanceof,int,interface,long,native,new,null'
				+ ',package,private,protected,public,return,short,static,strictfp,super,switch'
				+ ',synchronized,this,throw,throws,transient,true,try,void,volatile,while'
				+ ',const,goto'
				;

			var sTags_CSharp=
				'abstract,event,new,struct,as,explicit,null,switch,base,extern,object,this'
				+ ',bool,false,operator,throw,break,finally,out,true,byte,fixed,override,try'
				+ ',case,float,params,typeof,catch,for,private,uint,char,foreach,protected,ulong'
				+ ',class,if,readonly,unsafe,const,implicit,ref,ushort,continue,in,return,using'
				+ ',decimal,int,sbyte,virtual,default,interface,sealed,volatile,delegate,internal,short,void'
				+ ',do,is,sizeof,while,double,lock,stackalloc,else,long,static,enum,namespace,string'
				;

			var sTags_JS=
				//js keywords
				'break,case,catch,continue,default,delete,do,else,finally,for,function'
				+ ',if,in,instanceof,new,return,switch,this,throw,try,typeof,var,void,while,with'

				//js reserved
				+ ',abstract,boolean,byte,char,class,const,debugger,double,enum,export'
				+ ',extends,final,float,goto,implements,import,int,interface,long,native'
				+ ',package,private,protected,public,short,static,super,synchronized'
				+ ',throws,transient,volatile'

				//js classes
				+ ',Array,Boolean,Date,Math,Number,String,RegExp,Functions,Events'
				;

			var sTags_JSConst=
				//JS window constants
				'null,undefined,NaN,E,PI,SQRT2,SQRT1_2,LN2,LN10,LOG2E,LOG10E'

			var sTags_JSDom=
				//JS DOM objects
				'window,self,document,navigator,screen,history,location,alert,confirm,prompt,Infinity,java,Packages'

			var sTags_JSEvent=
				//JS DOM events
				'onabort,onblur,onchange,onclick,ondblclick,onerror,onfocus,onkeydown,onkeypress,onkeyup,onload'
				+ ',onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onreset,onresize,onselect,onsubmit,onunload'

			var sTags_HTML=
				'!DOCTYPE,a,abbr,acronym,address,applet,area,b,base,basefont,bdo,big'
				+ ',blockquote,body,br,button,caption,center,cite,code,col,colgroup,dd,del'
				+ ',dir,div,dfn,dl,em,fieldset,font,form,frame,frameset,h1,h2,h3,h4,h5,h6,h7,h8'
				+ ',head,hr,html,i,iframe,img,input,ins,isindex,kbd,label,legend,li,link,map'
				+ ',menu,meta,noframes,noscript,object,ol,optgroup,option,p,param,pre,q,s'
				+ ',samp,script,select,small,span,strike,strong,style,sub,sup,table,tbody'
				+ ',td,textarea,tfoot,th,thead,title,tr,tt,u,ul,var,xmp'
				;

			var sTags_Sql=
				'add,exit,primary'
				+ ',all,fetch,print'
				+ ',alter,file,privileges'
				+ ',and,fillfactor,proc'
				+ ',any,floppy,procedure'
				+ ',as,for,processexit'
				+ ',asc,foreign,public'
				+ ',authorization,freetext,raiserror'
				+ ',avg,freetexttable,read'
				+ ',backup,from,readtext'
				+ ',begin,full,reconfigure'
				+ ',between,goto,references'
				+ ',break,grant,repeatable'
				+ ',browse,group,replication'
				+ ',bulk,having,restore'
				+ ',by,holdlock,restrict'
				+ ',cascade,identity,return'
				+ ',case,identity_insert,revoke'
				+ ',check,identitycol,right'
				+ ',checkpoint,if,rollback'
				+ ',close,in,rowcount'
				+ ',clustered,index,rowguidcol'
				+ ',coalesce,inner,rule'
				+ ',column,insert,save'
				+ ',commit,intersect,schema'
				+ ',committed,into,select'
				+ ',compute,is,serializable'
				+ ',confirm,isolation,session_user'
				+ ',constraint,join,set'
				+ ',contains,key,setuser'
				+ ',containstable,kill,shutdown'
				+ ',continue,left,some'
				+ ',controlrow,level,statistics'
				+ ',convert,like,sum'
				+ ',count,lineno,system_user'
				+ ',create,load,table'
				+ ',cross,max,tape'
				+ ',current,min,temp'
				+ ',current_date,mirrorexit,temporary'
				+ ',current_time,national,textsize'
				+ ',current_timestamp,nocheck,then'
				+ ',current_user,nonclustered,to'
				+ ',cursor,not,top'
				+ ',database,null,tran'
				+ ',dbcc,nullif,transaction'
				+ ',deallocate,of,trigger'
				+ ',declare,off,truncate'
				+ ',default,offsets,tsequal'
				+ ',delete,on,uncommitted'
				+ ',deny,once,union'
				+ ',desc,only,unique'
				+ ',disk,open,update'
				+ ',distinct,opendatasource,updatetext'
				+ ',distributed,openquery,use'
				+ ',double,openrowset,user'
				+ ',drop,option,values'
				+ ',dummy,or,varying'
				+ ',dump,order,view'
				+ ',else,outer,waitfor'
				+ ',end,over,when'
				+ ',errlvl,percent,where'
				+ ',errorexit,perm,while'
				+ ',escape,permanent,with'
				+ ',except,pipe,work'
				+ ',exec,plan,writetext'
				+ ',execute,precision'
				+ ',exists,prepare'
				;

			var sTags_Php=
				'and,or,xor,__FILE__,exception'
				+ ',__LINE__,array,as,break,case'
				+ ',class,const,continue,declare,default'
				+ ',die,do,echo,else,elseif'
				+ ',empty,enddeclar,endfor,endforeach,endif'
				+ ',endswitch,endwhile,eval,exit,extends'
				+ ',for,foreach,function,global,if'
				+ ',include,include_once,isset,list,new'
				+ ',print,require,require_once,return,static'
				+ ',switch,unset,use,var,while'
				+ ',__FUNCTION__,__CLASS__,__METHOD__,final,php_user_filter'
				+ ',interface,implements,extends,public,private'
				+ ',protected,abstract,clone,try,catch'
				+ ',throw,cfunction,this'
				;

			//2012.7.19 added for R-language;
			var sTags_R=
				'break,else,for,function,if,TRUE,in'
				+ ',next,repeat,return,while,FALSE,switch'
				+ ',NULL,NA,NaN'
				;

			//2012.7.19  added for Google GO
			//https://golang-china.googlecode.com/svn/trunk/Chinese/golang.org/index.html
			var sTags_Go=
				'package,import,func,const,var,for'
				+ ',if,else,switch,case,default,select,return,break,continue'
				+ ',range,map,type,struct,interface,new,go,defer'
				+ ',byte,int,string,uint32,uint64,float32,float64'
				+ ',nil,true,false'
				;

			//2012.7.27 added for Visual Basic;
			//http://msdn.microsoft.com/en-us/library/ksh7h19t%28v=vs.80%29.aspx
			var sTags_VB_Reserved=
				'AddHandler,AddressOf,Alias,And,AndAlso,As,Boolean,ByRef,Byte,ByVal'
				+ ',Call,Case,Catch,CBool,CByte,CChar,CDate,CDec,CDbl,Char,CInt,Class'
				+ ',CLng,CObj,Const,Continue,CSByte,CShort,CSng,CStr,CType,CUInt,CULng'
				+ ',CUShort,Date,Decimal,Declare,Default,Delegate,Dim,DirectCast,Do'
				+ ',Double,Each,Else,ElseIf,End,EndIf,Enum,Erase,Error,Event,Exit,False'
				+ ',Finally,For,Friend,Function,Get,GetType,Global,GoSub,GoTo,Handles,If'
				+ ',Implements,Imports,In,Inherits,Integer,Interface,Is,IsNot,Let,Lib,Like'
				+ ',Long,Loop,Me,Mod,Module,MustInherit,MustOverride,MyBase,MyClass,Namespace'
				+ ',Narrowing,New,Next,Not,Nothing,NotInheritable,NotOverridable,Object,Of,On'
				+ ',Operator,Option,Optional,Or,OrElse,Overloads,Overridable,Overrides,ParamArray'
				+ ',Partial,Private,Property,Protected,Public,RaiseEvent,ReadOnly,ReDim,REM,RemoveHandler'
				+ ',Resume,Return,SByte,Select,Set,Shadows,Shared,Short,Single,Static,Step,Stop'
				+ ',String,Structure,Sub,SyncLock,Then,Throw,To,True,Try,TryCast,TypeOf,Variant'
				+ ',Wend,UInteger,ULong,UShort,Using,When,While,Widening,With,WithEvents,WriteOnly'
				+ ',Xor,#Const,#Else,#ElseIf,#End,#If'
				;
			var sTags_VB_Unreserved=
				'Ansi,Assembly,Auto,Binary,Compare,Custom,Explicit,IsFalse,IsTrue,Mid,Off'
				+ ',Preserve,Strict,Text,Unicode,Until,#ExternalSource,#Region'
				;
 
			//Array objects to save strings/comments substituted with internal tags;
			var vRem=[]; //for remarks (blocks & lines);
			var vStr=[]; //for Strings;
			var nRefID=0; //ID of remarks/strings;

			//2012.1.31 The tags are used to temporarily substitute strings/comments;
			//The ref-tags must be absolutely strange to the programming languages;
			var sRefTag1='!`', sRefTag2='`!';

			var _ref_tag=function(){return sRefTag1+(nRefID++)+sRefTag2;};

			var _parse_remark_blocks=function(sSrc, sRemBlockStart, sRemBlockEnd){
				//To substitute all the /*...*/ remark blocks with internal tags;
				if(sRemBlockStart && sRemBlockEnd){
					var s2=sSrc; sSrc='';
					while(s2){
						var p1=s2.indexOf(sRemBlockStart);
						if(p1>=0){
							var p2=s2.indexOf(sRemBlockEnd, p1+sRemBlockStart.length);
							if(p2<0) p2=s2.length; else p2+=sRemBlockEnd.length;
							//if(p2>0)
							{
								var left=s2.substr(0, p1), sRem=s2.substring(p1, p2), right=s2.substr(p2);
								var sTag=_ref_tag();
								sSrc+=(left+sTag);
								s2=right;
								vRem[vRem.length]={sTag: sTag, sVal: sRem};
							}
						}else{
							sSrc+=s2;
							s2='';
						}
					}
				}
				return sSrc;
			};

			var _parse_remark_line=function(sLine, vRemLineTag){

				var _replace=function(sLine, sRemLineTag){
					if(sLine && sRemLineTag){
						xRE=new RegExp(sRemLineTag+'(.*)$', '');
						sLine=sLine.replace(xRE, function(w){
							var sTag=_ref_tag();
							vRem[vRem.length]={sTag: sTag, sVal: w};
							return sTag;
						});
					}
					return sLine;
				};

				//substitute the remark lines with internal tags;
				for(var i in vRemLineTag){
					sLine=_replace(sLine, vRemLineTag[i]);
				}
				return sLine;
			};

			var _rtf_unicode_convert=function(sRtf){
				//handle with Unicode for Asian languages;
				var nLen=sRtf.length, s2='';
				for(var i=0; i<nLen; ++i){
					var n=sRtf.charCodeAt(i);
					if(n>0 && n<0x80){
						s2+=sRtf.charAt(i);
					}else{
						s2+=('\\u'+n+'?');
					}
				}
				return s2;
			};

			var _parse_strings=function(sLine, sQuotationMark){

				//substitute constants of C-string/HTML-value, like "...";
				//substitute constants of JS-string/HTML-value/C-char, like '...';

				var _pos_of_quotationmark=function(s, iStart){
					var p;
					while( (p=s.indexOf(sQuotationMark, iStart)) >0 ){
						if(s.charAt(p-1)=='\\'){
							iStart=p+sQuotationMark.length;
						}else{
							break;
						}
					}
					return p;
				};

				var s=sLine; sLine='';
				while(s){
					var p1=_pos_of_quotationmark(s, 0);
					if(p1>=0){
						var p2=_pos_of_quotationmark(s, p1+sQuotationMark.length);
						if(p2<0) p2=s.length; else p2+=sQuotationMark.length;
						//if(p2>0)
						{
							var left=s.substr(0, p1), sStr=s.substring(p1, p2), right=s.substr(p2);
							var sTag=_ref_tag();
							sLine+=(left+sTag);
							s=right;
							vStr[vStr.length]={sTag: sTag, sVal: sStr};
						}
					}else{
						sLine+=s;
						s='';
					}
				}
				return sLine;
			};

			var _restore_strings=function(s){
				//restore Strings;
				for(var j=vStr.length-1; j>=0; --j){
					var sTag=vStr[j].sTag, sVal=vStr[j].sVal;
					//2012.4.16 should append a SPACE at end of control words,
					//otherwise the next SPACE (if any) will be eaten from literal text;
					//var r='\\b\\cf3 '+sVal+'\\cf1\\b0';
					var r='\\b\\cf3 '+sVal+'\\cf1\\b0 '; //append the ending SPACE;
					s=s.replace(sTag, r);
				}
				return s;
			};

			var _restore_remarks=function(s){
				//restore remark blocks and lines;
				for(var j=vRem.length-1; j>=0; --j){
					var sTag=vRem[j].sTag, sVal=vRem[j].sVal;
					var v=sVal.split('\n'), r='';
					for(var i in v){
						if(r) r+='\\par\n';
						r+='\\cf2\\i '+v[i]+'\\i0\\cf1';
					}
					s=s.replace(sTag, r);
				}
				return s;
			};

			var _syntax_cpplike=function(s, vTags, sRemBlockStart, sRemBlockEnd, vRemLineTag){

				s=s.replace(/\r\n/g, '\n')
					.replace(/\r/g, '\n')
					.replace(/\\/g, '\\\\')
					;

				s=_rtf_unicode_convert(s);

				s=_parse_remark_blocks(s, sRemBlockStart, sRemBlockEnd);

				var _highlight_tags_SLOW=function(sLine, sKW, iColor, bNoCase){
					//2012.2.1 For each keywords, the RegExp is executed. This algorithm works slowly;
					if(sLine && sKW){

						var sFmt='\\b\\cf'+iColor+' ';

						if(0){
							//This RegExp doesn't match adjacent 2 same keywords separating with a single space, like this;
							//typedef typename std::vector<T>::iterator iterator;
							xRE=new RegExp( '(\\W+)(' + sKW + ')(\\W+)', 'g');
							sLine=sLine.replace(xRE, '$1'+sFmt+'$2\\cf1\\b0 $3');
						}else{
							//This RegExp test but not save and consume the trailing characters;
							xRE=new RegExp( '(\\W+)(' + sKW + ')(?=\\W)', 'g');
							sLine=sLine.replace(xRE, function(w, s1, s2){
								return s1+sFmt+s2+'\\cf1\\b0 ';
							});
						}

						//for keywords at begin of the line;
						xRE=new RegExp( '^(' + sKW + ')(\\W?)', '');
						sLine=sLine.replace(xRE, sFmt+'$1\\cf1\\b0 $2');

						//for keywords at end of the line;
						xRE=new RegExp( '(\\W?)(' + sKW + ')$', '');
						sLine=sLine.replace(xRE, '$1'+sFmt+'$2\\cf1\\b0');
					}
					return sLine;
				};

				var _highlight_tags=function(sLine, sTags, iColor, bNoCase){
					//2012.2.2 insert all keywords into a single RegExp that works much faster;
					sTags=sTags.replace(/,/g, '|'); //simply make into RegExp;
					if(sLine && sTags){

						var sFmt='\\b\\cf'+iColor+' ';

						//2012.2.3 add the '\t' at both begin/end of the line, to ensure isolated keyword (if any) in a line is highlighted as well.
						sLine='\t'+sLine+'\t';

						//This RegExp test but not save and consume the trailing characters;
						xRE=new RegExp( '(\\W+)(' + sTags + ')(?=\\W)', 'g'+(bNoCase?'i':''));
						sLine=sLine.replace(xRE, function(w, s1, s2){
							return s1+sFmt+s2+'\\cf1\\b0 ';
						});

						//2012.2.3 remove the 2 '\t' temporarily added (see above);
						sLine=sLine.replace(/(^\t)|(\t$)/g, '');
					}
					return sLine;
				};

				var _highlight_numbers=function(sLine, iColor){
					//2012.1.30 Not fully working with some c++ code like: (wYear%4==0 && wYear%100>0) || (wYear%400==0);
					if(sLine){
						var sFmt='\\b\\cf'+iColor+' ';

						//Hexadecimal, Decimal/Float;
						xRE=new RegExp( '(\\W+)((?:0x[0-9a-f]+)|(?:[0-9.]+))(?=\\W?)', 'ig');
						sLine=sLine.replace(xRE, function(w, s1, s2){
							//first check to see if it is a tag for strings/comments;
							var p=s1.indexOf(sRefTag1);
							if(p>=0 && p==s1.length-sRefTag1.length){
								//avoid replacing temporary tags of strings/remarks;
								return w;
							}else{
								return s1+sFmt+s2+'\\cf1\\b0 ';
							}
						});
					}
					return sLine;
				};

				var vLines=s.split('\n'), xRE;

				plugin.initProgressRange(plugin.getScriptTitle(), vLines.length);

				for(var k in vLines){

					var sLine=vLines[k];

					var sTitle=_trim(sLine), nMaxLen=32; if(sTitle.length>nMaxLen) sTitle=sTitle.substr(0,nMaxLen);
					var bContinue=plugin.ctrlProgressBar(sTitle, 1, false);
					if(!bContinue) return '';

					sLine=_parse_remark_line(sLine, vRemLineTag); //cpp-like comment lines;
					sLine=_parse_strings(sLine, '\''); //js-like strings;
					sLine=_parse_strings(sLine, '\"'); //cpp-like strings;

					for(var j in vTags){
						var d=vTags[j];
						var sTags=d.sTags, iColor=d.iColor, bNoCase=d.bNoCase;

						if(0){
							//2012.2.2 very low performance;
							var v=(sTags||'').split(',');
							v.sort(function(a, b){
								return b.length-a.length;
							});

							for(var i in v){
								sLine=_highlight_tags_SLOW(sLine, v[i], iColor, bNoCase);
							}
						}else{
							//2012.2.2 All keywords go into a single RegExp, this runs much faster than above;
							sLine=_highlight_tags(sLine, sTags, iColor, bNoCase);
						}
					}

					sLine=_highlight_numbers(sLine, 4);

					vLines[k]=sLine;
				}

				s='';
				for(var j in vLines){
					if(s) s+='\\par\n';
					s+=vLines[j];
				}

				s=_restore_strings(s);
				s=_restore_remarks(s);

				s=s.replace(/\t/g, '\\tab ')
					.replace(/\{/g, '\\{')
					.replace(/\}/g, '\\}')
					;

				s='{\\rtf1\\ansi\\deff0\\deflang1033\\deflangfe2052{\\fonttbl{\\f0\\fnil\\fcharset0 '+sFontName+';}}' + '\n'
					+ '{\\colortbl '
					+ ';' + sColorNormal + ';' + sColorRemarks + ';' + sColorStrings + ';' + sColorNumbers
					+ ';' + sColorKeywords
					+ ';' + sColorReservedTags1 + ';' + sColorReservedTags2 
					+ ';' + sColorReservedTags3 + ';' + sColorReservedTags4 
					+ ';}'
					+ '\\f0'
					+ '\\fs'+(nFontSize*2)
					+ '\n'
					+ s
					+ '}'
				;

				return s;
			};

			var xTmpFn=new CLocalFile(platform.getTempFile()); platform.deferDeleteFile(xTmpFn);

			var sRtf='', sTxt='', bSel=false;

			if(1){
				//2012.1.29 the loadText('ansi') function using the argument 'ansi' requires the latest update of nyfjs.dll;
				if(!sTxt){
					bSel=true;
					plugin.rtfStreamOut(xTmpFn, 0x01, bSel); //for selection;
					sTxt=xTmpFn.loadText('ansi');
				}
				if(!sTxt){
					bSel=false;
					plugin.rtfStreamOut(xTmpFn, 0x01, bSel); //for whole text;
					sTxt=xTmpFn.loadText('ansi');
				}
			}else{
				//2012.1.29 However, extractTextFromRtf() may insert hyperlinks into the source code;
				//and it extracts the text like '\\\\' as hyperlinks, this will make confusion to the source code;
				//so it's recommended to use the above rtfStreamOut(0x01:TXT) function;
				if(plugin.isRichEditVisible() && plugin.getSelectedText(false)){
					bSel=true;
					plugin.rtfStreamOut(xTmpFn, 0x02, bSel); //stream out currently selected RTF text;
				}else{
					bSel=false;
					plugin.rtfStreamOut(xTmpFn, 0x02, bSel); //stream out all existing RTF text;
				}
				sRtf=xTmpFn.loadText();
				sTxt=platform.extractTextFromRtf(sRtf);
			}

			if(sTxt){

				var xLang={
					  'cpp': 'C/C++'
					, 'cppstl': 'C/C++ with STL'
					, 'java': 'Java'
					, 'cs': 'C#'
					, 'js': 'Javascript'
					, 'sql': 'T-SQL'
					, 'php': 'PHP'
					, 'go': 'Google GO'
					, 'gnur': 'GNU/R Language'
					, 'vb': 'Visual Basic'
				};

				var vIDs=[], vLangs=[];
				for(var i in xLang){
					vIDs[vIDs.length]=i;
					vLangs[vLangs.length]=xLang[i];
				}

				sCfgKey='SyntaxHighlight.iAction';
				var sMsg=_lc2('SelLang', 'Highlight source code by syntax in the specified programming language.');
				var iSel=dropdown(sMsg, vLangs, localStorage.getItem(sCfgKey));
				if(iSel>=0){

					localStorage.setItem(sCfgKey, iSel);

					//sTxt='\n'+sTxt;

					var sID=vIDs[iSel];

					var vTags=[], sRemBlockStart='/*', sRemBlockEnd='*/', vRemLineTag=['//'];
					switch(sID){
						case 'cpp':
							vTags=[{sTags: sTags_Cpp, iColor: 5}];
							break;
						case 'cppstl':
							vTags=[{sTags: sTags_Cpp, iColor: 5}, {sTags: sTags_Stl, iColor: 6}];
							break;
						case 'java':
							vTags=[{sTags: sTags_Java, iColor: 5}];
							break;
						case 'cs':
							vTags=[{sTags: sTags_CSharp, iColor: 5}];
							break;
						case 'js':
							vTags=[{sTags: sTags_JS, iColor: 5}, {sTags: sTags_JSDom, iColor: 6}, {sTags: sTags_JSConst, iColor: 4}, {sTags: sTags_JSEvent, iColor: 7}];
							break;
						case 'sql':
							vTags=[{sTags: sTags_Sql, iColor: 5, bNoCase: true}];
							vRemLineTag=['--'];
							break;
						case 'php':
							vTags=[{sTags: sTags_Php, iColor: 5}];
							break;
						case 'gnur':
							vTags=[{sTags: sTags_R, iColor: 5}];
							sRemBlockStart='';
							sRemBlockEnd='';
							vRemLineTag=['#'];
							break;
						case 'go':
							vTags=[{sTags: sTags_Go, iColor: 5}];
							break;
						case 'vb':
							vTags=[{sTags: sTags_VB_Reserved, iColor: 5, bNoCase: true}, {sTags: sTags_VB_Unreserved, iColor: 6, bNoCase: true}];
							sRemBlockStart='';
							sRemBlockEnd='';
							vRemLineTag=['REM', '\''];
							break;
					}

					sRtf=_syntax_cpplike(sTxt, vTags, sRemBlockStart, sRemBlockEnd, vRemLineTag);
					if(sRtf){
						xTmpFn.saveAnsi(sRtf);
						plugin.rtfStreamIn(xTmpFn, 0x02, bSel); //0x02: RTF
					}
				}

			}else{
				alert(_lc('Prompt.Warn.NoTextSelected', 'No text is currently selected.'));
			}

			xTmpFn.delete();

		//}else{
		//	alert(_lc('Prompt.Warn.ReadonlyDb', 'Cannot modify the database opened as Readonly.'));
		//}

	}else{
		alert(_lc('Prompt.Warn.NoDbOpened', 'No database is currently opened.'));
	}
}catch(e){
	alert(e);
}
