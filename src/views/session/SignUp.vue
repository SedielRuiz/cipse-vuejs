<template>
	<div class="session-wrapper overlay">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-5  col-md-7 col-sm-10 col-xs-12 ">
					<div class="session-block d-block ">
						<div class="text-center mb-30">
							<div class="mb-20">
								<img class="img-fluid rounded-circle" width="150" height="150" src="/static/img/LogoCIPSE_800.png" />
							</div>
							<h3 class="mb-20">{{$t('message.registerToAdmin')}}</h3>
						</div>
						<div class="form-wrapper">
							<b-form @submit="onSubmit">
								<b-form-group id="exampleInputGroup1" label="email" label-for="email1">
									<b-form-input id="email1" type="text" v-model="form.email" required
										placeholder="Enter email">
									</b-form-input>
								</b-form-group>
								<b-form-group id="exampleInputGroup1" label="E-mail ID" label-for="emailInput1">
									<b-form-input id="emailInput1" type="email" v-model="form.email" required
										placeholder="Enter Your Email">
									</b-form-input>
								</b-form-group>
								<b-form-group id="exampleInputGroup2" label="Password" label-for="passwordInput1">
									<b-form-input id="passwordInput1" type="password" v-model="form.password" required
										placeholder="Enter Your Password">
									</b-form-input>
								</b-form-group>
								<b-button type="submit" variant="primary" class="session-btn mb-15">
									{{$t('message.createAccount')}}</b-button>
								<a href="/session/login"
									class="text-center fs-12 d-block text-success">{{$t('message.alreadyHaveAnAccount')}}</a>
							</b-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function () {
			return {
				form: {
					userName: '',
					password: '',
					email: ''
				}
			}
		},
		methods: {
			onSubmit(evt) {
				evt.preventDefault()
				let userDetail = {
					name: this.form.name,
					email: this.form.email,
					password: this.form.password
				};
				this.$store.dispatch("signupUserInFirebase", {
					userDetail
				});
			},
			signInWithFacebook() {
				this.$store.dispatch("signinUserWithFacebook");
			},
			signInWithGoogle() {
				this.$store.dispatch("signinUserWithGoogle");
			},
			signInWithTwitter() {
				this.$store.dispatch("signinUserWithTwitter");
			},
			signInWithGithub() {
				this.$store.dispatch("signinUserWithGithub");
			},
			signinWithAuth0() {
				login();
			},
			onCreateAccount() {
				this.$router.push("/session/sign-up");
			}
		}
	}
</script>