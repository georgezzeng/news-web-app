import request from "../utils/request/"

// portal/findAllTypes
// get headlines of all types
export const getfindAllTypes = () => {
  return request.get("portal/findAllTypes");
};
// look up news by page
export const getfindNewsPageInfo = (info) => {
  return request.post("portal/findNewsPage",info);
};
// show headline details
export const getshowHeadlineDetail = (id) => {
    return request({
        method: "post",
        url: "portal/showHeadlineDetail",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
         data:`hid=${id}`
  });
};

//callback function to remove headline by hid
// headline/removeByHid
export const removeByHid = (id) => {
    return request({
         method: "post",
            url: "headline/removeByHid",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            data:`hid=${id}`
  })
};

//login
export const getLogin = (info) => {
  return request.post("user/login",info);
};
//get user information
export const getUserInfo = (info) => {
  return request.get("user/getUserInfo");
};

//validate user registration   user/checkUserName
export const registerValidateApi = (username) => {
    return request({
         method: "post",
            url: "user/checkUserName",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            data:`username=${username}`
  })
};

//user registration
export const registerApi = (userInfo) => {
  return request.post("user/regist",userInfo)
}
//check if token is expired
export const isUserOverdue = () => {
  return request.get("user/checkLogin")
}

// get headline information by headline id
export const getFindHeadlineByHid = (id) => {
    return request({
        method: "post",
        url: "headline/findHeadlineByHid",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
         data:`hid=${id}`
  });
};

// save on click
// headline/update
export const saveOrAddNews = (news) => {
  return request.post("headline/update",news)
}

// headline/publish
export const issueNews = (news) => {
  return request.post("headline/publish",news)
}

