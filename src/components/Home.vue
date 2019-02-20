<template>
    <div class="hello">
        <p v-if="onlineStatus">This part will be visible only if user is online</p>
        <p v-if="!onlineStatus">This part will be visible only if user is offline</p>
        {{onlineStatusMsg}}
        <el-button type="primary" @click="openUserDialog">SEND USER DATA</el-button>
        <el-dialog title="Outer Dialog" :visible.sync="outerVisible">
            <el-tag type="success" v-if="onlineStatus">You seem to be online.</el-tag>
            <el-tag
                type="danger"
                v-if="!onlineStatus"
            >You seem to be offline. Your data will be save successfully Connect to send</el-tag>
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="form.username" placeholder="Username"></el-input>
                </el-form-item>
                <p>Username is: {{ form.username }}</p>
                <el-form-item label="Age" prop="age">
                    <el-input v-model="form.age" placeholder="Age"></el-input>
                </el-form-item>
                <p>Age is: {{ form.age }}</p>
                <el-form-item label="Sex" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="Male"></el-radio>
                        <el-radio label="Female"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-button type="primary" @click="sendUserData('form')">SEND</el-button>
            </el-form>
        </el-dialog>
        <el-row>
            <span>
                We're now using
                <a href="https://onesignal.com/">OneSignal</a> for notifications such as Event start/end alert.
            </span>
            <el-button @click="handleSubscribe">Subscribe</el-button>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios';
import IndexDB from '../helpers/indexDb.js';

export default {
  name: 'Home',
  data () {
    return {
      db: null,
      onlineStatus: null,
      onlineStatusMsg: '',
      form: {
        age: '',
        username: '',
        sex: ''
      },
      rules: {
        age: [
          {
            required: true,
            message: 'Please input your Age',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: 'Please input your Name',
            trigger: 'change'
          }
        ],
        sex: [
          {
            required: true,
            message: 'Please choice your sex',
            trigger: 'change'
          }
        ]
      },
      outerVisible: false
    };
  },
  props: {
    msg: String
  },
  async mounted () {
    await this.checkWifiData();
    this.db = new IndexDB();
    this.db.initDB().onsuccess = event => {
      this.checkIsData();
    };
    window.addEventListener('load', () => {
      window.addEventListener('sync', this.backgroundSync);
      window.addEventListener('online', this.checkWifiData);
      window.addEventListener('offline', this.checkWifiData);
    });
  },
  beforeDestroy: function () {
    window.removeEventListener('sync', this.backgroundSync);
    window.removeEventListener('online', this.checkWifiData);
    window.removeEventListener('offline', this.checkWifiData);
  },
  methods: {
    checkIsData () {
      if (this.db) {
        const self = this;
        const isOnline = this.$checkWifi();
        const db = this.db.getFromDB('person');
        if (isOnline && db) {
          db.onsuccess = event => {
            if (event.target.result.length) {
              const result = event.target.result[0];
              self.username = result.username;
              self.age = result.age;
              self.sex = result.sex;
              this.makeAjaxCall();
            }
          };
        }
      }
    },
    backgroundSync (event) {
      if (event.tag == 'myFirstSync') {
        if (this.onlineStatus) {
          this.makeAjaxCall();
        }
      }
    },
    async checkWifiData () {
      const isOnline = await this.$checkWifi();
      this.onlineStatus = !!isOnline;
      this.onlineStatusMsg = isOnline ? 'My network is fine' : 'I am offline';
      isOnline
        ? this.$message({
          message: 'My network is fine',
          type: 'success'
        })
        : this.$message.error(
          'You seem to be offline. Connect to send user data'
        );
      this.checkIsData();
    },
    sendUserData (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          return this.onlineStatus ? this.makeAjaxCall() : this.saveToLocalDb();
        }
        return false;
      });
    },
    openUserDialog () {
      this.outerVisible = true;
    },
    makeAjaxCall () {
      const data = {
        username: this.username,
        age: this.age,
        sex: this.sex
      };
      axios
        .post('https://www.mocky.io/v2/5c6d101d3700001119fa31a8', {
          body: data
        })
        .then(response => {
          this.$message({
            message: 'Your data was successfully sent',
            type: 'success'
          });
          this.clearForm();
          this.db.deleteFromDB('person');
          console.log(response);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    saveToLocalDb () {
      const data = {
        id: 1,
        username: this.form.username,
        age: this.form.age,
        sex: this.form.sex
      };
      this.db.addToDB('person', data);
      this.$message({
        message:
          'You seem to be offline, Your data save successfully Connect to send',
        type: 'warning'
      });
      this.clearForm();
      navigator.serviceWorker.ready.then(registration => {
        registration.sync.register('myFirstSync');
      });
    },
    clearForm () {
      this.form.username = '';
      this.form.age = '';
      this.form.sex = '';
      this.outerVisible = false;
    },
    handleSubscribe () {
      const OneSignal = window.OneSignal || [];
      OneSignal.registerForPushNotifications();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
