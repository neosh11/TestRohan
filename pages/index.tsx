import CustomGridList from '@components/CustomGridList'
import CustomList, { ListItem, ListProps } from '@components/CustomList'
import BaseLayout from '@layouts/Base'
import { Drink } from 'interfaces/drinks'
import { pageRoutes } from '../lib/routes'

const drinks: Drink[] = [{ name: 'RedBull and Vodka' }, { name: 'Gin and Tonic' }, { name: 'Rum and Coke' }]

export default function Home() {
  return (
    <>
      <BaseLayout title='DrinkUp' selectedNavKey='home' description='DrinkUp Babe' canonical={pageRoutes.home}>
        <CustomGridList drinks={drinks} />
      </BaseLayout>
    </>
  )
}
