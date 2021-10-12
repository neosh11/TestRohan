import CustomList, { ListItem, ListProps } from '@components/CustomList'

const drinks: ListItem[] = [
  { name: 'jaa', title: 'adad', calories: 10 },

  { name: 'AHD', title: 'adad', price: 123, calories: 10 },

  { name: 'ADJHKAF', title: 'adad', calories: 10 }
]

export default function Home() {
  return (
    <>
      <div>
        <CustomList drinks={drinks} />
      </div>
    </>
  )
}
