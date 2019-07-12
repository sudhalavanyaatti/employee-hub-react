<MDBRow  md="6">
<MDBInput
  type="text"
  name="name"
  value={this.state.fullName}
  onChange={event => this.handleChangeFullname(event)}
  label="Full Name"
  id="materialFormRegisterNameEx"
  required
/>
</MDBRow>
<MDBRow md="6">
<MDBInput
  type="radio"
  name="gender"
  value="Male"
  onClick={this.state.gender === 'Male'}
  onChange={event => this.handleChangeGender(event)}
  label="Male"
  id="materialFormRegisterNameEx"
  required
/>
</MDBRow>
<MDBRow md="6">
<MDBInput
type="radio"
name="gender"
value="Female"
onClick={this.state.gender === 'Female'}
onChange={event => this.handleChangeGender(event)}
  label="Female"
  id="materialFormRegisterNameEx"
  required
/>
</MDBRow>
<MDBRow md="6">
<Select
  options={options}
  value={this.state.category}
  name="category"
  placeholder="Select Category"
  onChange={event => this.handleChangeCategory(event)}
  label="Category"
  id="materialFormRegisterNameEx"
  required
/>
</MDBRow>
<MDBRow md="6">
<MDBInput
  type="email"
  name="email"
  value={this.state.email}
  onChange={event => this.handleChangeEmail(event)}
  label="Email"
  id="materialFormRegisterEmailEx2"
  required
/>
</MDBRow>
<MDBRow md="6">
<MDBInput
  type="tel"
  name="phone"
  maxLength="10"
  minLength="10"
  value={this.state.phone}
  onChange={event => this.handleChangeNumber(event)}
  label="Phone "
  id="materialFormRegisterPhnEx2"
  required
/>
</MDBRow>
<MDBRow md="6">
<MDBInput
  type="tel"
  name="experience"
  maxLength="2"
  minLength="1"
  value={this.state.experience}
  onChange={event => this.handleChangeExperience(event)}
  label="Experience"
  id="materialFormRegisterExperienceEx2"
  required
/>
</MDBRow>
<MDBRow md="6">
<MDBInput
  name="city"
  type="text"
  value={this.state.city}
  onChange={event => this.handleChangeCity(event)}
  label="City"
  id="materialFormRegisterCityEx2"
  required
/>
</MDBRow>
<MDBRow md="6">
<MDBInput
  type="text"
  name="zip"
  value={this.state.zip}
  onChange={event => this.handleChangeZip(event)}
  label="Zip"
  id="materialFormRegisterZipEx2"
  required
/>
</MDBRow>
<MDBRow md="6">
<MDBInput
  name="state"
  type="text"
  value={this.state.state}
  onChange={event => this.handleChangeState(event)}
  label="State"
  id="materialFormRegisterStateEx2"
  required
/>
</MDBRow>
<MDBRow md="6">
<MDBInput
  type="date"
  name="dob"
  value={this.state.dob}
  onChange={event => this.handleChangeDob(event)}
  label="D.O.B"
  id="materialFormRegisterDobEx2"
  required
/>
</MDBRow>
<MDBRow md="6"> 
<MDBInput
  type="text"
  name="language"
  value={this.state.language}
  onChange={event => this.handleChangeLanguage(event)}
  label="Language"
  id="materialFormRegisterLanguageEx2"
  required
/>
</MDBRow>
<MDBRow md="6">
<MDBInput
  type="text"
  name="blood_Group"
  value={this.state.blood_Group}
  onChange={event => this.handleChangeblood_Group(event)}
  label="Blood group"
  id="materialFormRegisterBGEx"
  required
/>
</MDBRow>
<MDBRow md="6">   
<MDBInput
  type="text"
  name="companyName"
  value={this.state.companyName}
  onChange={event => this.handleChangeCompanyName(event)}
  id="materialFormRegisterCompanyEx2"
  label="Company name"
  required
/>
</MDBRow>

