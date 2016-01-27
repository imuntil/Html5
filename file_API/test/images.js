function setImagePreview() {
	$("#imgdiv").remove();
	var docObj = document.getElementById("doc");
	var idname = "";
	if (docObj.files && docObj.files[0]) {
		document.getElementById("localImag").innerHTML = "";
		for ( var i = 0; i < docObj.files.length; i++) {
			idname = "preview" + i;
			$("#localImag").append(
					"<b style='float:left;width:85px'><img id='" + idname
							+ "' width=-1 height=-1 style='diplay:none'/></b>");
			var imgObjPreview = document.getElementById(idname);
			imgObjPreview.style.display = 'block';
			imgObjPreview.style.width = '60px';
			imgObjPreview.style.height = '60px';
			imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
		}
		// 火狐下，直接设img属性
		// imgObjPreview.src = docObj.files[0].getAsDataURL();
		// 火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式

	} else {
		// IE下，使用滤镜
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		alert(imgSrc);
		var localImagId = document.getElementById("localImag");
		// 必须设置初始大小
		localImagId.style.width = "60px";
		localImagId.style.height = "60px";
		// 图片异常的捕捉，防止用户修改后缀来伪造图片
		try {
			localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters
					.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		} catch (e) {
			alert("您上传的图片格式不正确，请重新选择!");
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}

	return true;
}
function setPhotoPreview() {
	var docObj = document.getElementById("docs");
	var idname = "";
	if (docObj.files && docObj.files[0]) {
		console.log(docObj);
		console.log(docObj.files);
		console.log(docObj.files.item(0).name);
		document.getElementById("locals").innerHTML = "";
		for ( var i = 0; i < docObj.files.length; i++) {
			idname = "pres" + i;
			$("#locals").append(
					"<b style='float: left;width:85px'><img id='" + idname
							+ "' width=-1 height=-1 style='diplay:none'/></b>");
			var imgObjPreview = document.getElementById(idname);
			imgObjPreview.style.display = 'block';
			imgObjPreview.style.width = '60px';
			imgObjPreview.style.height = '60px';
			imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
		}
		// 火狐下，直接设img属性
		// imgObjPreview.src = docObj.files[0].getAsDataURL();
		// 火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式

	} else {
		// IE下，使用滤镜
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		alert(imgSrc);
		var localImagId = document.getElementById("locals");
		// 必须设置初始大小
		localImagId.style.width = "60px";
		localImagId.style.height = "60px";
		// 图片异常的捕捉，防止用户修改后缀来伪造图片
		try {
			localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters
					.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		} catch (e) {
			alert("您上传的图片格式不正确，请重新选择!");
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}

	return true;
}

function setHeaderPreview(){
	$("#imgdiv").remove();
	var docObj = document.getElementById("docsp");
	var idname = "";
	if (docObj.files && docObj.files[0]) {
		document.getElementById("localheader").innerHTML = "";
		for ( var i = 0; i < docObj.files.length; i++) {
			idname = "presv" + i;
			$("#localheader").append(
					"<b style='float: left;width:85px'><img id='" + idname
							+ "' width=-1 height=-1 style='diplay:none'/></b>");
			var imgObjPreview = document.getElementById(idname);
			imgObjPreview.style.display = 'block';
			imgObjPreview.style.width = '60px';
			imgObjPreview.style.height = '60px';
			imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
		}
		// 火狐下，直接设img属性
		// imgObjPreview.src = docObj.files[0].getAsDataURL();
		// 火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式

	} else {
		// IE下，使用滤镜
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		alert(imgSrc);
		var localImagId = document.getElementById("localheader");
		// 必须设置初始大小
		localImagId.style.width = "60px";
		localImagId.style.height = "60px";
		// 图片异常的捕捉，防止用户修改后缀来伪造图片
		try {
			localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters
					.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		} catch (e) {
			alert("您上传的图片格式不正确，请重新选择!");
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}

	return true;
} 