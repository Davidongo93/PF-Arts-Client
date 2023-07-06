import {Page, View, Document,Text} from '@react-pdf/renderer';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart } from 'victory';
import styles from './Reports.module.css';

const DocPDF = () => {
  return(
      <Document>
        <Page size='A4'>
        <Text>Arts Gallery Reports</Text>
            <View className={styles['ContainerGraf']}>            
              <VictoryPie
                colorScale={['#e74c3c', '#2ecc', '#eeeb22cc']}
                data={[
                  { x: 'Users', y: 35 },
                  { x: 'Sales', y: 40 },
                  { x: 'artworks', y: 55 },
                ]}
                animate={[2000]}
                labelComponent={<VictoryLabel
                  angle={45}
                  style={{ fill: 'red' }}
                />}
              />
    
              <VictoryChart domainPadding={{ x: 20 }}>
                <VictoryBar
                  style={{
                    data: {
                      fill: ({ datum }) => datum.fill,
                    },
                    labels: { fill: 'black' },
                  }}
                  alignment='start'
                  data={[
                    { x: 'Users', y: 35, fill: 'red' },
                    { x: 'Sales', y: 40, fill: 'orange' },
                    { x: 'artworks', y: 55, fill: 'blue' },
                  ]}
                  labels={({ datum }) => datum.y}
                  labelComponent={<VictoryLabel dy={0} dx={15} />}
                />
              </VictoryChart>
            </View>
        </Page>
      </Document>
  )
}
  export default DocPDF;