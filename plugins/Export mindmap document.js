
//sValidation=nyfjs
//sCaption=Export MindMap document ...
//sHint=Export the current outline branch as .mmap document
//sCategory=MainMenu.Share
//sLocaleID=p.ExportMindMap
//sAppVerMin=6.0.9
//sShortcutKey=

var _lc=function(sTag, sDef){return plugin.getLocaleMsg(sTag, sDef);};
var _lc2=function(sTag, sDef){return _lc(plugin.getLocaleID()+'.'+sTag, sDef);};

var _trim=function(s){return (s||'').replace(/^\s+|\s+$/g, '');};
var _trim_cr=function(s){return (s||'').replace(/\r+$/g, '');};

var _validate_filename=function(s){
	s=s||'';
	s=s.replace(/[\*\?\.\(\)\[\]\{\}\<\>\\\/\!\$\^\&\+\|,;:\"\'`~@]/g, ' ');
	s=s.replace(/\s{2,}/g, ' ');
	s=_trim(s);
	if(s.length>64) s=s.substr(0, 64);
	s=_trim(s);
	s=s.replace(/\s/g, '_');
	return s;
};

try{

	var xNyf=new CNyfDb(-1);
	if(xNyf.isOpen()){

		var sCurItem=plugin.getCurInfoItem(-1);
		var sItemTitle=xNyf.getFolderHint(sCurItem);

		var sDstFn=platform.getSaveFileName(
			{ sTitle: ''
			, sFilter: 'MindMap documents (*.mmap)|*.mmap|All files (*.*)|*.*'
			, sDefExt: '.mmap'
			, bOverwritePrompt: true
			, sFilename: _validate_filename(sItemTitle)||'untitled'
			});

		if(sDstFn){

			var nFolders=0;

			//To estimate the progress range;
			//xNyf.traverseOutline(sCurItem, true, function(){
			//	nFolders++;
			//});

			plugin.initProgressRange(plugin.getScriptTitle(), nFolders);

			var _OId=function(){
				return '';
			};

			var _traverseBranch=function(xElm, sSsgPath, iLevel, _actPre, _actPost){
				if(xNyf.folderExists(sSsgPath)){
					var xApTopic=xElm.createElement('ap:Topic');
					if(xApTopic){
						{
							xApTopic.addAttribute('Gen', '0000000000000000');
							xApTopic.addAttribute('Dirty', '0000000000000001');
							//xApTopic.addAttribute('OId', _OId());
						}

						if(_actPre) _actPre(xApTopic, sSsgPath, iLevel);
						_traverseChildren(xApTopic, sSsgPath, iLevel+1, _actPre, _actPost);
						if(_actPost) _actPost(xApTopic, sSsgPath, iLevel);
					}
				}
			};

			var _traverseChildren=function(xElm, sSsgPath, iLevel, _actPre, _actPost){
				var v=xNyf.listFolders(sSsgPath);
				var xElmSub;
				if(v && v.length>0){
					xElmSub=xElm.createElement('ap:SubTopics');
				}
				for(var i in v){
					var sName=v[i];
					if(sName){
						var xSsgSub=new CLocalFile(sSsgPath); xSsgSub.append(sName); xSsgSub.append('/');
						_traverseBranch(xElmSub, xSsgSub, iLevel, _actPre, _actPost);
					}
				}
			};

			var xml=new CXmlDocument();

			var xApMap=xml.getElementByPath('/ap:Map', true);
			if(xApMap){
				xApMap.addAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
				xApMap.addAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
				xApMap.addAttribute('xmlns:ap', 'http://schemas.mindjet.com/MindManager/Application/2003');
				xApMap.addAttribute('xmlns:cor', 'http://schemas.mindjet.com/MindManager/Core/2003');
				xApMap.addAttribute('xmlns:pri', 'http://schemas.mindjet.com/MindManager/Primitive/2003');
				xApMap.addAttribute('xsi:schemaLocation', 'http://schemas.mindjet.com/MindManager/Application/2003 http://schemas.mindjet.com/MindManager/Application/2003 http://schemas.mindjet.com/MindManager/Core/2003 http://schemas.mindjet.com/MindManager/Core/2003 http://schemas.mindjet.com/MindManager/Delta/2003 http://schemas.mindjet.com/MindManager/Delta/2003 http://schemas.mindjet.com/MindManager/Primitive/2003 http://schemas.mindjet.com/MindManager/Primitive/2003');

				xApMap.addAttribute('Gen', '0000000000000000');
				xApMap.addAttribute('Dirty', '0000000000000001');
				//xApMap.addAttribute('OId', _OId());

				var xCorCustom=xApMap.createElement('cor:Custom');
				if(xCorCustom){
					xCorCustom.addAttribute('xmlns:cst0', 'http://schemas.mindjet.com/MindManager/UpdateCompatibility/2004');
					xCorCustom.addAttribute('cst0:UpdatedCategories', 'true');
					xCorCustom.addAttribute('Uri', 'http://schemas.mindjet.com/MindManager/UpdateCompatibility/2004');
					xCorCustom.addAttribute('cst0:UpdatedVisibilityStyle', 'true');
					xCorCustom.addAttribute('Index', '0');
					xCorCustom.addAttribute('Dirty', '0000000000000000');
				}

				var xApOneTopic=xApMap.createElement('ap:OneTopic');
				if(xApOneTopic){

					//xApOneTopic.addAttribute('');

					var _xActPost=function(xElm, sSsgPath, iLevel){

						if(xNyf.folderExists(sSsgPath, false)){
							var xSsgFn=new CLocalFile(sSsgPath); xSsgFn.append(plugin.getDefNoteFn());

							var sTitle=xNyf.getFolderHint(sSsgPath)||'Untitled';

							var bContinue=plugin.ctrlProgressBar(sTitle, 1, true);
							if(!bContinue) return true;

							//var tModi=xNyf.getModifyTime(xSsgFn);
							//var sRtf=xNyf.loadText(xSsgFn);
							//var sNote=platform.extractTextFromRtf(sRtf);

							var xApTopic=xElm; //.createElement('ap:Topic');

							var xElmTVG=xApTopic.createElement('ap:TopicViewGroup');
							xElmTVG.addAttribute('ViewIndex', '0');

							var xApText=xApTopic.createElement('ap:Text');
							xApText.addAttribute('Dirty', '0000000000000001');
							xApText.addAttribute('ReadOnly', 'false');
							xApText.addAttribute('PlainText', sTitle);

							var xElmFnt=xApText.createElement('ap:Font');
						}
					};

					_traverseBranch(xApOneTopic, sCurItem, 0, null, _xActPost);

					var sXml=xml.serialize();

					var bSucc=false;
					if(sXml){
						var z=new CZip();
						if(z && z.create(sDstFn, '')){
							var xTmpFn=new CLocalFile(platform.getTempFile()); platform.deferDeleteFile(xTmpFn);
							if(xTmpFn.saveUtf8(sXml)>0){
								z.addEntry(xTmpFn, 'Document.xml');
								z.close();
								bSucc=true;
							}
						}
					}

					if(bSucc){
						var sMsg=_lc2('Done', 'Successfully generated the .mmap document.');
						alert(sMsg+'\n\n'+sDstFn);
					}

				}
			}
		}
	}else{
		alert(_lc('Prompt.Warn.NoDbOpened', 'No database is currently opened.'));
	}

}catch(e){
	alert(e);
}
