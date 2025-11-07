pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Run k6 Test') {
      steps {
        sh '''
          sudo apt-get update
          sudo apt-get install -y k6
          K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=demoQAMain.html k6 run demoQAMain.js
        '''
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'report.html', fingerprint: true
    }
  }
}
