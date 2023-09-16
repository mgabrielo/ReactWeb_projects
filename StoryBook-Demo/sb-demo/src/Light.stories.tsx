import type {Meta, StoryObj} from '@storybook/react';
import Light from './Light';

const meta : Meta<typeof Light>={
    component: Light,
    title:'Light',
    argTypes: {
        variant:{
            control: {type: 'select'},
            options: ['green', 'yellow', 'red']
        }
    },
    tags: ['autodocs']
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Base : Story = {

}
export const Yellow : Story = {
    args:{
        variant :'yellow'
    }
}
export const Red : Story = {
    args:{
        variant :'red'
    }
}

export const Another: Story ={
    render: (
        ()=>(
            <div style={{display:'flex', flexDirection:'column', gap:10, border:'1px solid black', backgroundColor:'gray', padding:10, width:'fit-content'}}>
            <Light variant='red'/>
            <Light variant='yellow'/>
            <Light variant='green'/>
            </div>
        )
    )
}