<template>
  <v-container>
    <v-row>
      <v-col v-for="file in files"  :key="file.title"
             cols="12" md="6" sm="12">
        <v-list lines="two">
          <v-list-item
            :subtitle="file.subtitle"
            :title="file.title"
          >
            <template v-slot:prepend>
              <v-avatar>
                <v-icon>{{ file.icon }}</v-icon>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <p class="heading-label">បរិយាយ</p>
    <p class="text-indent">
      ជាផ្នែកមួយនៃការអភិវឌ្ឍន៍ទេសចរណ៍កំពង់ស្ពឺ សហគមន៍តំបន់ បានរៀបចំដំណើរកំសាន្ត Eco Tour ដើម្បីជំរុញឱ្យមានការអភិវឌ្ឍន៍ទេសចរណ៍យ៉ាងចីរភាព និងការការពារបរិស្ថាន។ ដំណើរកំសាន្តនេះផ្តោតលើការផ្តល់បទពិសោធន៍ដ៏អស្ចារ្យក្នុងធម្មជាតិ ដូចជាការឡើងភ្នំ ការបោះតង់ និងការលេងទឹកធ្លាក់។ អ្នកដំណើរនឹងមានឱកាសស្វែងយល់អំពីវប្បធម៌ និងជីវិតប្រចាំថ្ងៃរបស់សហគមន៍តំបន់ តាមរយៈការជួបជុំជាមួយអ្នកនៅទីនោះ និងការចូលរួមក្នុងសកម្មភាពប្រចាំថ្ងៃ។ ដំណើរកំសាន្តនេះគឺជាវិធីដ៏ល្អក្នុងការរីករាយជាមួយធម្មជាតិ និងគាំទ្រសហគមន៍ក្នុងការអភិវឌ្ឍន៍យ៉ាងចីរភាព។
    </p>
    <br/>
    <p class="heading-label">រំលេច</p>
    <p>
      - ការឡើងភ្នំដ៏អស្ចារ្យដែលផ្តល់ទេសភាពធម្មជាតិស្រស់ស្អាត<br/>
      - ការបោះតង់ក្រោមផ្កាយ និងការស្តាប់សម្លេងធម្មជាតិ<br/>
      - ការលេងទឹកធ្លាក់ដ៏ស្រស់ស្រាយ<br/>
      - ការជួបជុំជាមួយសហគមន៍តំបន់ និងការស្វែងយល់អំពីវប្បធម៌របស់ពួកគេ<br/>
      - អាហារដែលមានរសជាតិឆ្ងាញ់ដែលបានរៀបចំដោយសហគមន៍
    </p>
    <br/>
    <p class="heading-label mb-2">សេវាកម្មសហគមន៍</p>
    <v-row>
      <v-col v-for="(service,index) in services"  :key="index"
             cols="12" md="6" sm="12">
        <p> <v-icon color="success">mdi-check</v-icon> {{service}}</p>
      </v-col>
    </v-row>
    <br/>
    <p class="heading-label mb-2">កម្មវីធី</p>
    <v-row>
      <v-col v-for="(activity,index) in activities"  :key="index"
             cols="12" md="12" sm="12">
        <p class="font-weight-medium"><v-icon color="error">mdi-minus</v-icon> {{activity.title}}</p>
        <p class="text-indent">{{activity.description}}</p>
        <br/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const files = [
  {
    icon: 'mdi-calendar',
    subtitle: 'Jan 20, 2014',
    title: 'កាលបរិច្ចេទធ្វើដំណើរ',
  },
  {
    icon: 'mdi-account-circle-outline',
    subtitle: 'បង រ៉ាន់ ខ្នងវាល',
    title: 'សហគមន៍តំបន់',
  },
  {
    icon: 'mdi-map-marker-outline',
    subtitle: 'ភូមិ សូរិយា ឃុំតាសាល ស្រុកតាសាល ខេត្តកំពង់ស្ពឺ',
    title: 'ទីកន្លែង',
  },
  {
    icon: 'mdi-cellphone',
    subtitle: '096 96 40 495',
    title: 'ទំនាក់ទំនងសហគមន៍',
  },
  {
    icon: 'mdi-clock-time-four-outline',
    subtitle: '១យប់ ២ថ្ងៃ',
    title: 'រយៈពេលដំណើរកំសាន្ត',
  },
  {
    icon: 'mdi-hiking',
    subtitle: 'ឡើងភ្នំ បោះតង់ លេងទឹកធ្លាក់',
    title: 'សកម្មភាព',
  },
]

const services = [
  'អាហារពេលព្រឹក',
  'អាហារពេលល្ងាច',
  'សេវាកម្មមេដឹកនាំដំណើរកំសាន្ត',
  'សេវាកម្មបោះតង់ និងសម្ភារៈបោះតង់',
  'សេវាកម្មដឹកជញ្ជូនតាមតម្រូវការ',
]

const activities = [
  {
    title: 'ថ្ងៃទី០១',
    description: 'មកដល់សហគមន៍តំបន់ និងចាប់ផ្តើមដំណើរកំសាន្តឡើងភ្នំ។ អ្នកដំណើរនឹងទទួលបានការស្វាគមន៍ពីសហគមន៍ និងទទួលអាហារពេលល្ងាច។ បន្ទាប់មក អ្នកដំណើរនឹងចាប់ផ្តើមឡើងភ្នំ ដើម្បីទស្សនាទេសភាពធម្មជាតិស្រស់ស្អាត និងបោះតង់ក្រោមផ្កាយ។',
  },
  {
    title: 'ថ្ងៃទី០២',
    description: 'ព្រឹកនេះ អ្នកដំណើរនឹងទទួលអាហារពេលព្រឹកនៅលើភ្នំ បន្ទាប់មកចាប់ផ្តើមចុះពីភ្នំ និងទៅលេងទឹកធ្លាក់ដ៏ស្រស់ស្រាយ។ បន្ទាប់ពីរួចរាល់ អ្នកដំណើរនឹងត្រឡប់ទៅសហគមន៍ ហើយមានឱកាសជួបជុំជាមួយសហគមន៍ និងស្វែងយល់អំពីវប្បធម៌របស់ពួកគេ មុននឹងបញ្ចប់ដំណើរកំសាន្ត។',
  },
  {
    title: 'សកម្មភាពបន្ថែម',
    description: 'ក្រៅពីសកម្មភាពសំខាន់ៗ អ្នកដំណើរអាចរីករាយជាមួយសកម្មភាពបន្ថែមផ្សេងទៀត ដូចជាការជិះកង់តាមផ្លូវធម្មជាតិ ការស្វែងរកសត្វព្រៃ និងការចូលរួមក្នុងសកម្មភាពប្រចាំថ្ងៃរបស់សហគមន៍។',
  }
]

</script>
<style scoped>
.heading-label {
  font-size: 1.2rem;
  font-weight: 500;
}
.text-indent {
  text-indent: 1.5rem;
  text-align: justify;
}

</style>
