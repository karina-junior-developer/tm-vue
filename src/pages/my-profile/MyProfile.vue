<template>
  <div class="profileBlock">
    <div class="caption">My profile</div>
    <div class="refactoring">
      <div class="regularInformation">
        <div>User name: {{ userName }}</div>
        <div>Email: {{ userEmail }}</div>
        <div>Rights: {{ userRights }}</div>
      </div>
      <div class="pic">
        <img :src="img" alt="userPhoto" />
      </div>
    </div>
  </div>
</template>

<script>
import userPic from '../../assets/img/userPic.jpg';
export default {
  name: 'MyProfile',

  data() {
    return {
      userName: 'Karishka',
      userEmail: 'karina@gmail.com',
      userRights: 'Moderator',
      img: userPic,
    };
  },
};
</script>

<style lang="scss" scoped>
.profileBlock {
  margin-left: 400px;
  margin-top: 100px;
  font-size: 15px;
}

.caption {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 25px;
}

div {
  margin-bottom: 10px;
}

img {
  width: 90px;
  height: 100px;
  border-radius: 10px;
}

.pic {
  margin-left: 140px;
}

.refactoring {
  display: flex;
  flex-direction: row;
}

.regularInformation {
  margin-top: 17px;
}
</style>
